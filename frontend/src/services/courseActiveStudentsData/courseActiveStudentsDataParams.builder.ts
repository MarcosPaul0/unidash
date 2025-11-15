import {
  FilterCourseActiveStudentsDataDto,
  filterCourseActiveStudentsDataDtoSchema,
} from "@unidash/api/dtos/courseActiveStudentsData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseActiveStudentsDataParams =
  FilterCourseActiveStudentsDataDto & PaginationDto;

export class CourseActiveStudentsDataParamsBuilder extends BaseParamsBuilder<FilterCourseActiveStudentsDataDto> {
  public applyFilters(filtersDto: FilterCourseActiveStudentsDataDto): this {
    const validatedFilters =
      filterCourseActiveStudentsDataDtoSchema.safeParse(filtersDto);

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
