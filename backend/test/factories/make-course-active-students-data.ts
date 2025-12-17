import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import {
  CourseActiveStudentsData,
  CourseActiveStudentsDataProps,
} from "@/domain/entities/course-active-students-data";
import { PrismaCourseActiveStudentsDataMapper } from "@/infra/database/prisma/mappers/prisma-course-active-students-data-mapper";

export function makeCourseActiveStudentsData(
  override: Partial<CourseActiveStudentsDataProps> = {},
  id?: UniqueEntityId
) {
  const courseActiveStudentsData = CourseActiveStudentsData.create(
    {
      year: 2025,
      semester: "first",
      courseId: "course-active-students-data-1",
      activeStudentsByIngress: [],
      ...override,
    },
    id
  );

  return courseActiveStudentsData;
}

@Injectable()
export class CourseActiveStudentsDataFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCourseActiveStudentsData(
    data: Partial<CourseActiveStudentsDataProps> = {}
  ): Promise<CourseActiveStudentsData> {
    const courseActiveStudentsData = makeCourseActiveStudentsData(data);

    await this.prisma.courseActiveStudentsData.create({
      data: PrismaCourseActiveStudentsDataMapper.toPrismaCreate(
        courseActiveStudentsData
      ),
    });

    return courseActiveStudentsData;
  }
}
