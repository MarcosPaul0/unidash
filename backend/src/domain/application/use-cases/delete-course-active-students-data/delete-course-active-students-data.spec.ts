import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryTeacherCoursesRepository } from "test/repositories/in-memory-teacher-courses-repository";
import { AuthorizationService } from "@/infra/authorization/authorization.service";
import { makeAdmin } from "test/factories/make-admin";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeStudent } from "test/factories/make-student";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeTeacherCourse } from "test/factories/make-teacher-course";
import { makeSessionUser } from "test/factories/make-session-user";
import { DeleteCourseActiveStudentsDataUseCase } from "./delete-course-active-students-data";
import { InMemoryCourseActiveStudentsDataRepository } from "test/repositories/in-memory-course-active-students-data-repository";
import { makeCourseActiveStudentsData } from "test/factories/make-course-active-students-data";

let inMemoryCourseActiveStudentsDataRepository: InMemoryCourseActiveStudentsDataRepository;
let inMemoryTeacherCoursesRepository: InMemoryTeacherCoursesRepository;
let authorizationService: AuthorizationService;
let sut: DeleteCourseActiveStudentsDataUseCase;

describe("Delete Course Active Students Data", () => {
  beforeEach(() => {
    inMemoryCourseActiveStudentsDataRepository =
      new InMemoryCourseActiveStudentsDataRepository();
    inMemoryTeacherCoursesRepository = new InMemoryTeacherCoursesRepository();
    authorizationService = new AuthorizationService(
      inMemoryTeacherCoursesRepository
    );

    sut = new DeleteCourseActiveStudentsDataUseCase(
      inMemoryCourseActiveStudentsDataRepository,
      authorizationService
    );
  });

  it("should be able to delete course active students data", async () => {
    const adminUser = makeAdmin();
    const newCourseActiveStudentsData = makeCourseActiveStudentsData(
      {},
      new UniqueEntityId("courseActiveStudentsData-1")
    );

    inMemoryCourseActiveStudentsDataRepository.create(
      newCourseActiveStudentsData
    );

    const result = await sut.execute({
      courseActiveStudentsDataId: "courseActiveStudentsData-1",
      sessionUser: makeSessionUser(adminUser),
    });

    expect(result.isRight()).toBe(true);
    expect(
      inMemoryCourseActiveStudentsDataRepository.courseActiveStudentsData
    ).toHaveLength(0);
  });

  it("should not be able to delete course active students data if not exists", async () => {
    const adminUser = makeAdmin();

    const result = await sut.execute({
      courseActiveStudentsDataId: "courseActiveStudentsData-1",
      sessionUser: makeSessionUser(adminUser),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).instanceOf(ResourceNotFoundError);
  });

  it("should not be able to delete course active students data if session user is student", async () => {
    const studentUser = makeStudent();
    const newCourseActiveStudentsData = makeCourseActiveStudentsData(
      {},
      new UniqueEntityId("courseActiveStudentsData-1")
    );

    inMemoryCourseActiveStudentsDataRepository.create(
      newCourseActiveStudentsData
    );

    const result = await sut.execute({
      courseActiveStudentsDataId: "courseActiveStudentsData-1",
      sessionUser: makeSessionUser(studentUser),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).instanceOf(NotAllowedError);
  });

  it("should not be able to delete course active students data if session user is teacher with invalid role", async () => {
    const teacherCourse = makeTeacherCourse({
      teacherRole: "extensionsActivitiesManagerTeacher",
    });
    const newCourseActiveStudentsData = makeCourseActiveStudentsData(
      {},
      new UniqueEntityId("courseActiveStudentsData-1")
    );

    inMemoryTeacherCoursesRepository.create(teacherCourse);
    inMemoryCourseActiveStudentsDataRepository.create(
      newCourseActiveStudentsData
    );

    const result = await sut.execute({
      courseActiveStudentsDataId: "courseActiveStudentsData-1",
      sessionUser: makeSessionUser(teacherCourse.teacher),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).instanceOf(NotAllowedError);
  });
});
