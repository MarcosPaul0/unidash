import {
  FilterTeacherTechnicalScientificProductionsDataDto,
  filterTeacherTechnicalScientificProductionsDataDtoSchema,
} from "@unidash/api/dtos/teacherTechnicalScientificProductionsData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllTeacherTechnicalScientificProductionsDataParams =
  FilterTeacherTechnicalScientificProductionsDataDto & PaginationDto;

export class TeacherTechnicalScientificProductionsDataParamsBuilder extends BaseParamsBuilder<FilterTeacherTechnicalScientificProductionsDataDto> {
  public applyFilters(
    filtersDto: FilterTeacherTechnicalScientificProductionsDataDto
  ): this {
    const validatedFilters =
      filterTeacherTechnicalScientificProductionsDataDtoSchema.safeParse(
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
