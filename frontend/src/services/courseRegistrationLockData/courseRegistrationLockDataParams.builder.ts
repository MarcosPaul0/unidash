import {
  FilterCourseRegistrationLockDataDto,
  filterCourseRegistrationLockDataDtoSchema,
} from "@unidash/api/dtos/courseRegistrationLockData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseRegistrationLockDataParams =
  FilterCourseRegistrationLockDataDto & PaginationDto;

export class CourseRegistrationLockDataParamsBuilder extends BaseParamsBuilder<FilterCourseRegistrationLockDataDto> {
  public applyFilters(filtersDto: FilterCourseRegistrationLockDataDto): this {
    const validatedFilters =
      filterCourseRegistrationLockDataDtoSchema.safeParse(filtersDto);

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
