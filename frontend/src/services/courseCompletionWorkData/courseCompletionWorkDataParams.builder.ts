import {
  FilterCourseCompletionWorkDataDto,
  filterCourseCompletionWorkDataDtoSchema,
} from "@unidash/api/dtos/courseCompletionWorkData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseCompletionWorkDataParams =
  FilterCourseCompletionWorkDataDto & PaginationDto;

export class CourseCompletionWorkDataParamsBuilder extends BaseParamsBuilder<FilterCourseCompletionWorkDataDto> {
  public applyFilters(filtersDto: FilterCourseCompletionWorkDataDto): this {
    const validatedFilters =
      filterCourseCompletionWorkDataDtoSchema.safeParse(filtersDto);

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
