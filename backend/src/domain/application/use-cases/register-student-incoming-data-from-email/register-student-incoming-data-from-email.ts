import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { SessionUser } from "@/domain/entities/user";
import { AuthorizationService } from "@/infra/authorization/authorization.service";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Semester } from "@/domain/entities/course-data";
import { InvalidStudentForCourseDataError } from "../errors/invalid-student-for-course-data-error";
import { StudentIncomingDataAlreadyExistsError } from "../errors/student-incoming-data-already-exists-error";
import { StudentIncomingDataRepository } from "../../repositories/student-incoming-data-repository";
import {
  CurrentEducation,
  EnglishProficiencyLevel,
  StudentIncomingData,
  WorkExpectation,
} from "@/domain/entities/student-incoming-data";
import { StudentAffinityByDisciplineDataRepository } from "../../repositories/student-affinity-by-discipline-data-repository";
import { StudentAssetDataRepository } from "../../repositories/student-asset-data-repository";
import { StudentCourseChoiceReasonDataRepository } from "../../repositories/student-course-choice-reason-data-repository";
import { StudentHobbyOrHabitDataRepository } from "../../repositories/student-hobby-or-habit-data-repository";
import { StudentTechnologyDataRepository } from "../../repositories/student-technology-data-repository";
import { StudentUniversityChoiceReasonDataRepository } from "../../repositories/student-university-choice-reason-data-repository";
import {
  AffinityLevel,
  HighSchoolDiscipline,
  StudentAffinityByDisciplineData,
} from "@/domain/entities/student-affinity-by-discipline-data";
import { StudentAssetData } from "@/domain/entities/student-asset-data";
import { Asset } from "@/domain/entities/student-asset";
import { CourseChoiceReason } from "@/domain/entities/student-course-choice-reason";
import { HobbyOrHabit } from "@/domain/entities/student-hobby-or-habit";
import { Technology } from "@/domain/entities/student-technology";
import { UniversityChoiceReason } from "@/domain/entities/student-university-choice-reason";
import { StudentCourseChoiceReasonData } from "@/domain/entities/student-course-choice-reason-data";
import { StudentUniversityChoiceReasonData } from "@/domain/entities/student-university-choice-reason-data";
import { StudentHobbyOrHabitData } from "@/domain/entities/student-hobby-or-habit-data";
import { StudentTechnologyData } from "@/domain/entities/student-technology-data";
import { CitiesRepository } from "../../repositories/cities-repository";
import { CityNotFoundError } from "../errors/city-not-found-error";
import { TokenEncrypter } from "../../cryptography/token-encrypter";
import { StudentsRepository } from "../../repositories/students-repository";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { RegisterStudentIncomingDataTokensRepository } from "../../repositories/register-student-incoming-data-tokens-repository";

interface RegisterStudentIncomingDataFromEmailUseCaseRequest {
  studentIncomingData: {
    workExpectation: WorkExpectation;
    currentEducation: CurrentEducation;
    englishProficiencyLevel: EnglishProficiencyLevel;
    cityId: string;
    nocturnalPreference: boolean;
    knowRelatedCourseDifference: boolean;
    readPedagogicalProject: boolean;
    affinityByDisciplines: {
      affinityLevel: AffinityLevel;
      discipline: HighSchoolDiscipline;
    }[];
    assets: Asset[];
    courseChoiceReasons: CourseChoiceReason[];
    hobbyOrHabits: HobbyOrHabit[];
    technologies: Technology[];
    universityChoiceReasons: UniversityChoiceReason[];
  };
  incomingStudentToken: string;
}

type RegisterStudentIncomingDataFromEmailUseCaseResponse = Either<
  | StudentIncomingDataAlreadyExistsError
  | ResourceNotFoundError
  | InvalidStudentForCourseDataError
  | CityNotFoundError,
  {
    studentIncomingData: StudentIncomingData;
  }
>;

@Injectable()
export class RegisterStudentIncomingDataFromEmailUseCase {
  constructor(
    private registerStudentIncomingDataTokenRepository: RegisterStudentIncomingDataTokensRepository,
    private studentRepository: StudentsRepository,
    private citiesRepository: CitiesRepository,
    private studentIncomingDataRepository: StudentIncomingDataRepository,
    private studentAffinityByDisciplineDataRepository: StudentAffinityByDisciplineDataRepository,
    private studentAssetDataRepository: StudentAssetDataRepository,
    private studentCourseChoiceReasonDataRepository: StudentCourseChoiceReasonDataRepository,
    private studentHobbyOrHabitDataRepository: StudentHobbyOrHabitDataRepository,
    private studentTechnologyDataRepository: StudentTechnologyDataRepository,
    private studentUniversityChoiceReasonDataRepository: StudentUniversityChoiceReasonDataRepository,
    private authorizationService: AuthorizationService
  ) {}

  async execute({
    studentIncomingData: {
      knowRelatedCourseDifference,
      nocturnalPreference,
      readPedagogicalProject,
      workExpectation,
      affinityByDisciplines,
      assets,
      courseChoiceReasons,
      hobbyOrHabits,
      technologies,
      universityChoiceReasons,
      currentEducation,
      englishProficiencyLevel,
      cityId,
    },
    incomingStudentToken,
  }: RegisterStudentIncomingDataFromEmailUseCaseRequest): Promise<RegisterStudentIncomingDataFromEmailUseCaseResponse> {
    const registerStudentIncomingDataToken =
      await this.registerStudentIncomingDataTokenRepository.findByToken(
        incomingStudentToken
      );

    if (!registerStudentIncomingDataToken) {
      return left(new NotAllowedError());
    }

    const incomingStudent = await this.studentRepository.findById(
      registerStudentIncomingDataToken.userId.toString()
    );

    if (!incomingStudent) {
      return left(new NotAllowedError());
    }

    const sessionUser: SessionUser = {
      id: incomingStudent.id.toString(),
      createdAt: incomingStudent.createdAt,
      email: incomingStudent.email,
      name: incomingStudent.name,
      role: incomingStudent.role,
      accountActivatedAt: incomingStudent.accountActivatedAt,
      updatedAt: incomingStudent.updatedAt,
    };

    const authorization = await this.authorizationService.ensureUserRole(
      sessionUser,
      ["student"]
    );

    if (authorization.isLeft()) {
      return left(authorization.value);
    }

    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      return left(new CityNotFoundError());
    }

    const studentId = sessionUser.id;

    const studentIncomingDataAlreadyExists =
      await this.studentIncomingDataRepository.findByStudentId(studentId);

    if (studentIncomingDataAlreadyExists) {
      return left(new StudentIncomingDataAlreadyExistsError());
    }

    const year = new Date().getFullYear();
    const semester: Semester = new Date().getMonth() > 6 ? "second" : "first";

    const studentIncomingData = StudentIncomingData.create({
      knowRelatedCourseDifference,
      nocturnalPreference,
      readPedagogicalProject,
      semester,
      workExpectation,
      year,
      studentId,
      currentEducation,
      englishProficiencyLevel,
      cityId,
    });

    const studentIncomingDataCreated =
      await this.studentIncomingDataRepository.create(studentIncomingData);

    const allStudentAffinityByDisciplineData = affinityByDisciplines.map(
      (data) =>
        StudentAffinityByDisciplineData.create({
          studentIncomingDataId: studentIncomingDataCreated.id.toString(),
          affinityLevel: data.affinityLevel,
          discipline: data.discipline,
        })
    );

    await this.studentAffinityByDisciplineDataRepository.createMany(
      allStudentAffinityByDisciplineData
    );

    const allStudentAssetData = assets.map((asset) =>
      StudentAssetData.create({
        studentIncomingDataId: studentIncomingDataCreated.id.toString(),
        asset,
      })
    );

    await this.studentAssetDataRepository.createMany(allStudentAssetData);

    const allCourseChoiceReasonData = courseChoiceReasons.map(
      (courseChoiceReason) =>
        StudentCourseChoiceReasonData.create({
          studentIncomingDataId: studentIncomingDataCreated.id.toString(),
          choiceReason: courseChoiceReason,
        })
    );

    await this.studentCourseChoiceReasonDataRepository.createMany(
      allCourseChoiceReasonData
    );

    const allHobbyOrHabitData = hobbyOrHabits.map((hobbyOrHabit) =>
      StudentHobbyOrHabitData.create({
        studentIncomingDataId: studentIncomingDataCreated.id.toString(),
        hobbyOrHabit,
      })
    );

    await this.studentHobbyOrHabitDataRepository.createMany(
      allHobbyOrHabitData
    );

    const allTechnologyData = technologies.map((technology) =>
      StudentTechnologyData.create({
        studentIncomingDataId: studentIncomingDataCreated.id.toString(),
        technology,
      })
    );

    await this.studentTechnologyDataRepository.createMany(allTechnologyData);

    const allUniversityChoiceReasonData = universityChoiceReasons.map(
      (universityChoiceReason) =>
        StudentUniversityChoiceReasonData.create({
          studentIncomingDataId: studentIncomingDataCreated.id.toString(),
          choiceReason: universityChoiceReason,
        })
    );

    await this.studentUniversityChoiceReasonDataRepository.createMany(
      allUniversityChoiceReasonData
    );

    return right({
      studentIncomingData,
    });
  }
}
