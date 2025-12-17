import { Pagination } from "@/core/pagination/pagination";
import {
  CourseActiveStudentsDataRepository,
  FindAllCourseActiveStudentsData,
  FindAllCourseActiveStudentsDataFilter,
} from "@/domain/application/repositories/course-active-students-data-repository";
import { FindForIndicatorsFilter } from "@/domain/application/repositories/course-coordination-data-repository";
import { CourseActiveStudentsData } from "@/domain/entities/course-active-students-data";
import { Semester } from "@/domain/entities/course-data";

export class InMemoryCourseActiveStudentsDataRepository implements CourseActiveStudentsDataRepository {
  public courseActiveStudentsData: CourseActiveStudentsData[] = [];

  async findById(id: string): Promise<CourseActiveStudentsData | null> {
    const courseActiveStudentsData = this.courseActiveStudentsData.find(
      (item) => item.id.toString() === id
    );

    if (!courseActiveStudentsData) {
      return null;
    }

    return courseActiveStudentsData;
  }

  async findByCourseAndPeriod(
    courseId: string,
    year: number,
    semester: Semester
  ): Promise<CourseActiveStudentsData | null> {
    const courseActiveStudentsData = this.courseActiveStudentsData.find(
      (item) =>
        item.courseId === courseId &&
        item.year === year &&
        item.semester === semester
    );

    if (!courseActiveStudentsData) {
      return null;
    }

    return courseActiveStudentsData;
  }

  async findAll(
    courseId: string,
    { page, itemsPerPage }: Pagination,
    { semester, year }: FindAllCourseActiveStudentsDataFilter
  ): Promise<FindAllCourseActiveStudentsData> {
    const filteredCourseActiveStudentsData =
      this.courseActiveStudentsData.filter(
        (departureData) =>
          (semester ? departureData.semester === semester : true) &&
          (year ? departureData.year === year : true) &&
          departureData.courseId === courseId
      );

    const currentPage = (page - 1) * itemsPerPage;
    const totalItemsToTake = page * itemsPerPage;

    const courseActiveStudentsData = filteredCourseActiveStudentsData.slice(
      currentPage,
      totalItemsToTake
    );

    const totalItems = filteredCourseActiveStudentsData.length;
    const totalPages = Math.ceil(
      filteredCourseActiveStudentsData.length / itemsPerPage
    );

    return {
      courseActiveStudentsData,
      totalItems,
      totalPages,
    };
  }

  async findForIndicators(
    courseId: string,
    filters?: FindForIndicatorsFilter
  ): Promise<CourseActiveStudentsData[]> {
    const filteredCourseActiveStudentsData =
      this.courseActiveStudentsData.filter(
        (coordinationData) =>
          (filters?.semester
            ? coordinationData.semester === filters.semester
            : true) &&
          (filters?.year ? coordinationData.year === filters.year : true) &&
          (filters?.yearFrom
            ? coordinationData.year > filters.yearFrom
            : true) &&
          (filters?.yearTo ? coordinationData.year < filters.yearTo : true) &&
          coordinationData.courseId === courseId
      );

    return filteredCourseActiveStudentsData;
  }

  async save(
    courseActiveStudentsData: CourseActiveStudentsData
  ): Promise<void> {
    const itemIndex = this.courseActiveStudentsData.findIndex(
      (item) => item.id === courseActiveStudentsData.id
    );

    this.courseActiveStudentsData[itemIndex] = courseActiveStudentsData;
  }

  async create(courseActiveStudentsData: CourseActiveStudentsData) {
    this.courseActiveStudentsData.push(courseActiveStudentsData);
  }

  async delete(
    courseActiveStudentsData: CourseActiveStudentsData
  ): Promise<void> {
    const itemIndex = this.courseActiveStudentsData.findIndex(
      (item) => item.id === courseActiveStudentsData.id
    );

    this.courseActiveStudentsData.splice(itemIndex, 1);
  }
}
