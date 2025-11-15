import {
  FilterCourseExtensionComplementaryActivitiesDataDto,
  filterCourseExtensionComplementaryActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseExtensionComplementaryActivitiesData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseExtensionComplementaryActivitiesDataParams =
  FilterCourseExtensionComplementaryActivitiesDataDto & PaginationDto;

export class CourseExtensionComplementaryActivitiesDataParamsBuilder extends BaseParamsBuilder<FilterCourseExtensionComplementaryActivitiesDataDto> {
  public applyFilters(
    filtersDto: FilterCourseExtensionComplementaryActivitiesDataDto
  ): this {
    const validatedFilters =
      filterCourseExtensionComplementaryActivitiesDataDtoSchema.safeParse(
        filtersDto
      );

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
