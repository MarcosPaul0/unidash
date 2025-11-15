import {
  FilterStudentIncomingDataDto,
  filterStudentIncomingDataDtoSchema,
} from "@unidash/api/dtos/studentIncomingData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllStudentIncomingDataParams = FilterStudentIncomingDataDto &
  PaginationDto;

export class StudentIncomingDataParamsBuilder extends BaseParamsBuilder<FilterStudentIncomingDataDto> {
  public applyFilters(filtersDto: FilterStudentIncomingDataDto): this {
    const validatedFilters =
      filterStudentIncomingDataDtoSchema.safeParse(filtersDto);

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
