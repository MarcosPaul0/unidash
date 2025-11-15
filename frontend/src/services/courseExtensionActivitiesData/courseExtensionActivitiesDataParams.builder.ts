import {
  FilterCourseExtensionActivitiesDataDto,
  filterCourseExtensionActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseExtensionActivitiesData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseExtensionActivitiesDataParams =
  FilterCourseExtensionActivitiesDataDto & PaginationDto;

export class CourseExtensionActivitiesDataParamsBuilder extends BaseParamsBuilder<FilterCourseExtensionActivitiesDataDto> {
  public applyFilters(
    filtersDto: FilterCourseExtensionActivitiesDataDto
  ): this {
    const validatedFilters =
      filterCourseExtensionActivitiesDataDtoSchema.safeParse(filtersDto);

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
