import { PaginationDto } from "@unidash/api/dtos/pagination.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";

export type GetAllTeacherCoursesParams = PaginationDto;

export class TeacherCourseParamsBuilder extends BaseParamsBuilder<null> {
  public applyFilters(): this {
    return this;
  }
}
