import {
  FilterCourseTeacherWorkloadDataDto,
  filterCourseTeacherWorkloadDataDtoSchema,
} from "@unidash/api/dtos/courseTeacherWorkloadData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseTeacherWorkloadDataParams =
  FilterCourseTeacherWorkloadDataDto & PaginationDto;

export class CourseTeacherWorkloadDataParamsBuilder extends BaseParamsBuilder<FilterCourseTeacherWorkloadDataDto> {
  public applyFilters(filtersDto: FilterCourseTeacherWorkloadDataDto): this {
    const validatedFilters =
      filterCourseTeacherWorkloadDataDtoSchema.safeParse(filtersDto);

    if (!validatedFilters.success) {
      return this;
    }

    if (validatedFilters.data?.year) {
      this.params["year"] = validatedFilters.data.year;
    }

    if (validatedFilters.data?.semester) {
      this.params["semester"] = validatedFilters.data.semester;
    }

    return this;
  }
}
