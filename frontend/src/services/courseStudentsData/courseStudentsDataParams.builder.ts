import {
  FilterCourseStudentsDataDto,
  filterCourseStudentsDataDtoSchema,
} from "@unidash/api/dtos/courseStudentsData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseStudentsDataParams = FilterCourseStudentsDataDto &
  PaginationDto;

export class CourseStudentsDataParamsBuilder extends BaseParamsBuilder<FilterCourseStudentsDataDto> {
  public applyFilters(filtersDto: FilterCourseStudentsDataDto): this {
    const validatedFilters =
      filterCourseStudentsDataDtoSchema.safeParse(filtersDto);

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
