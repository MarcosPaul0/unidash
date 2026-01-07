import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../../repositories/students-repository";
import { Hasher } from "../../cryptography/hasher";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { NotificationSender } from "../../notification-sender/notification-sender";
import { AccountActivationTokensRepository } from "../../repositories/account-activation-tokens-repository";
import dayjs from "dayjs";
import { randomBytes, randomUUID } from "crypto";
import { UsersRepository } from "../../repositories/users-repository";
import { Student, StudentType } from "@/domain/entities/student";
import { AccountActivationToken } from "@/domain/entities/account-activation-token";
import { SessionUser } from "@/domain/entities/user";
import { AuthorizationService } from "@/infra/authorization/authorization.service";
import { TokenEncrypter } from "../../cryptography/token-encrypter";

interface RegisterStudentUseCaseRequest {
  student: {
    name: string;
    email: string;
    matriculation: string;
    courseId: string;
    type: StudentType;
  };
  sessionUser: SessionUser;
}

type RegisterStudentUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    student: Student;
  }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private studentsRepository: StudentsRepository,
    private userAccountActivationTokensRepository: AccountActivationTokensRepository,
    private hasher: Hasher,
    private notificationSender: NotificationSender,
    private authorizationService: AuthorizationService,
    private encrypter: TokenEncrypter
  ) {}

  async execute({
    student: { name, email, matriculation, courseId, type },
    sessionUser,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const authorization =
      await this.authorizationService.ensureIsAdminOrTeacherWithRole(
        sessionUser,
        courseId,
        ["courseManagerTeacher"]
      );

    if (authorization.isLeft()) {
      return left(authorization.value);
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    // TODO remover código duplicado
    const password = randomBytes(12).toString("base64").slice(0, 12);

    const hashedPassword = await this.hasher.hash(password);

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
      matriculation,
      courseId,
      type,
      role: "student",
    });

    const accountActivationToken = AccountActivationToken.create({
      userId: student.id,
      token: randomUUID(),
      expiresAt: dayjs().add(1, "d").toDate(),
    });

    await this.studentsRepository.create(student);

    await this.userAccountActivationTokensRepository.create(
      accountActivationToken
    );

    if (type === "incomingStudent") {
      const incomingStudentToken =
        await this.encrypter.generateIncomingStudentToken({
          sub: student.id.toString(),
        });

      await this.notificationSender.sendIncomingStudentRegistrationNotification(
        {
          name: student.name,
          email: student.email,
          password: password,
          incomingStudentToken,
        }
      );
    }

    return right({
      student,
    });
  }
}
