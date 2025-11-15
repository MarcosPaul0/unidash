import {
  FilterCourseDepartureDataDto,
  filterCourseDepartureDataDtoSchema,
} from "@unidash/api/dtos/courseDepartureData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllCourseDepartureDataParams = FilterCourseDepartureDataDto &
  PaginationDto;

export class CourseDepartureDataParamsBuilder extends BaseParamsBuilder<FilterCourseDepartureDataDto> {
  public applyFilters(filtersDto: FilterCourseDepartureDataDto): this {
    const validatedFilters =
      filterCourseDepartureDataDtoSchema.safeParse(filtersDto);

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
