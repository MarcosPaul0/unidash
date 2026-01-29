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
import { RegisterStudentIncomingDataTokensRepository } from "../../repositories/register-student-incoming-data-tokens-repository";
import { EnvService } from "@/infra/env/env.service";
import { RegisterStudentIncomingDataToken } from "@/domain/entities/register-student-incoming-data-token";

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
    private registerStudentIncomingDataTokenRepository: RegisterStudentIncomingDataTokensRepository,
    private envService: EnvService
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

    const password = this.hasher.generatePassword();

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
      var registerStudentIncomingDataInDays = Number(
        this.envService.get("JWT_INCOMING_STUDENT_EXPIRATION_DAYS")
      );

      const registerIncomingStudentDataToken =
        RegisterStudentIncomingDataToken.create({
          userId: student.id,
          expiresAt: dayjs()
            .add(registerStudentIncomingDataInDays, "d")
            .toDate(),
          token: randomUUID(),
        });

      await this.registerStudentIncomingDataTokenRepository.create(
        registerIncomingStudentDataToken
      );

      await this.notificationSender.sendIncomingStudentRegistrationNotification(
        {
          name: student.name,
          email: student.email,
          password: password,
          incomingStudentToken: registerIncomingStudentDataToken.token,
        }
      );
    }

    return right({
      student,
    });
  }
}
