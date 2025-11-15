import {
  FilterCourseCoordinationDataDto,
  filterCourseCoordinationDataDtoSchema,
} from "@unidash/api/dtos/courseCoordinationData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseCoordinationDataParams =
  FilterCourseCoordinationDataDto & PaginationDto;

export class CourseCoordinationDataParamsBuilder extends BaseParamsBuilder<FilterCourseCoordinationDataDto> {
  public applyFilters(filtersDto: FilterCourseCoordinationDataDto): this {
    const validatedFilters =
      filterCourseCoordinationDataDtoSchema.safeParse(filtersDto);

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
