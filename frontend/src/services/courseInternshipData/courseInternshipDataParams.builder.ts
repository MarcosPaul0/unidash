import {
  FilterCourseInternshipDataDto,
  filterCourseInternshipDataDtoSchema,
} from "@unidash/api/dtos/courseInternshipData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseInternshipDataParams = FilterCourseInternshipDataDto &
  PaginationDto;

export class CourseInternshipDataParamsBuilder extends BaseParamsBuilder<FilterCourseInternshipDataDto> {
  public applyFilters(filtersDto: FilterCourseInternshipDataDto): this {
    const validatedFilters =
      filterCourseInternshipDataDtoSchema.safeParse(filtersDto);

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
