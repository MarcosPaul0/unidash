import {
  FilterCourseTeachingComplementaryActivitiesDataDto,
  filterCourseTeachingComplementaryActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseTeachingComplementaryActivitiesData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseTeachingComplementaryActivitiesDataParams =
  FilterCourseTeachingComplementaryActivitiesDataDto & PaginationDto;

export class CourseTeachingComplementaryActivitiesDataParamsBuilder extends BaseParamsBuilder<FilterCourseTeachingComplementaryActivitiesDataDto> {
  public applyFilters(
    filtersDto: FilterCourseTeachingComplementaryActivitiesDataDto
  ): this {
    const validatedFilters =
      filterCourseTeachingComplementaryActivitiesDataDtoSchema.safeParse(
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
