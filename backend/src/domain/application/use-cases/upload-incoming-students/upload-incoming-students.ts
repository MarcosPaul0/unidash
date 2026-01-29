import dayjs from "dayjs";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { StudentsRepository } from "../../repositories/students-repository";
import {
  ExtractedStudent,
  StudentExtractorService,
} from "../../services/student-extractor.service";
import pdfParse from "pdf-parse";
import { InvalidStudentPdfError } from "../errors/invalid-students-pdf-error";
import { Student } from "@/domain/entities/student";
import { AuthorizationService } from "@/infra/authorization/authorization.service";
import { SessionUser } from "@/domain/entities/user";
import { NotificationSender } from "../../notification-sender/notification-sender";
import { Hasher } from "../../cryptography/hasher";
import { RegisterStudentIncomingDataToken } from "@/domain/entities/register-student-incoming-data-token";
import { EnvService } from "@/infra/env/env.service";
import { randomUUID } from "node:crypto";
import { RegisterStudentIncomingDataTokensRepository } from "../../repositories/register-student-incoming-data-tokens-repository";

interface UploadIncomingStudentsUseCaseRequest {
  data: {
    clearIncomingStudents: boolean;
    courseId: string;
    incomingStudentsBuffer: Buffer;
  };
  sessionUser: SessionUser;
}

type UploadIncomingStudentsUseCaseResponse = Either<
  NotAllowedError | InvalidStudentPdfError,
  {
    students: Student[];
  }
>;

@Injectable()
export class UploadIncomingStudentsUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private registerStudentIncomingDataTokenRepository: RegisterStudentIncomingDataTokensRepository,
    private studentExtractorService: StudentExtractorService,
    private authorizationService: AuthorizationService,
    private notificationSender: NotificationSender,
    private hasher: Hasher,
    private envService: EnvService
  ) {}

  async execute({
    data,
    sessionUser,
  }: UploadIncomingStudentsUseCaseRequest): Promise<UploadIncomingStudentsUseCaseResponse> {
    const authorization =
      await this.authorizationService.ensureIsAdminOrTeacherWithRole(
        sessionUser,
        data.courseId,
        ["courseManagerTeacher"]
      );

    if (authorization.isLeft()) {
      return left(authorization.value);
    }

    if (data.clearIncomingStudents) {
      this.setIncomingStudentsToRegularStudent();
    }

    const currentYear = new Date().getFullYear();

    const pdf = await pdfParse(data.incomingStudentsBuffer);

    const yearBlock = this.studentExtractorService.extractYearBlock(
      pdf.text,
      currentYear
    );

    if (!yearBlock || yearBlock.length == 0) {
      return left(new InvalidStudentPdfError());
    }

    const normalizedYearBlock =
      this.studentExtractorService.normalizeYearBlock(yearBlock);

    if (!normalizedYearBlock || normalizedYearBlock.length == 0) {
      return left(new InvalidStudentPdfError());
    }

    const yearBlockStudents =
      this.studentExtractorService.extractStudentsFromNormalizedYearBlock(
        normalizedYearBlock,
        currentYear
      );

    if (!yearBlockStudents || yearBlockStudents.length == 0) {
      return left(new InvalidStudentPdfError());
    }

    const incomingStudents = await this.generateIncomingStudentsFromYearBlock(
      data.courseId,
      yearBlockStudents
    );

    const incomingStudentsCreated =
      await this.registerStudents(incomingStudents);

    return right({
      students: incomingStudentsCreated,
    });
  }

  private async setIncomingStudentsToRegularStudent(): Promise<void> {
    const currentIncomingStudents = await this.studentsRepository.findAll(
      undefined,
      {
        type: "incomingStudent",
      }
    );

    currentIncomingStudents.students.forEach((incomingStudent) => {
      incomingStudent.type = "regularStudent";
    });

    await this.studentsRepository.saveMany(currentIncomingStudents.students);
  }

  private async registerStudents(
    incomingStudents: Student[]
  ): Promise<Student[]> {
    const incomingStudentsCreated: Student[] = [];

    for (const incomingStudent of incomingStudents) {
      const studentAlreadyExists =
        await this.studentsRepository.findByMatriculation(
          incomingStudent.matriculation
        );

      if (studentAlreadyExists) {
        continue;
      }

      const password = incomingStudent.password;
      const hashedPassword = await this.hasher.hash(password);
      incomingStudent.password = hashedPassword;

      await this.studentsRepository.create(incomingStudent);
      incomingStudentsCreated.push(incomingStudent);

      var registerStudentIncomingDataInDays = Number(
        this.envService.get("JWT_INCOMING_STUDENT_EXPIRATION_DAYS")
      );

      const registerIncomingStudentDataToken =
        RegisterStudentIncomingDataToken.create({
          userId: incomingStudent.id,
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
          name: incomingStudent.name,
          email: incomingStudent.email,
          password: password,
          incomingStudentToken: registerIncomingStudentDataToken.token,
        }
      );
    }

    return incomingStudentsCreated;
  }

  private async generateIncomingStudentsFromYearBlock(
    courseId: string,
    yearBlockStudents: ExtractedStudent[]
  ): Promise<Student[]> {
    const newIncomingStudents = yearBlockStudents.map(
      async (extractedStudent) => {
        const password = this.hasher.generatePassword();

        return Student.create({
          courseId: courseId,
          email: extractedStudent.email,
          matriculation: extractedStudent.matriculation,
          name: extractedStudent.name,
          role: "student",
          type: "incomingStudent",
          password: password,
        });
      }
    );

    return await Promise.all(newIncomingStudents);
  }
}
