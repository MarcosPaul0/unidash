import {
  FilterTeacherResearchAndExtensionProjectsDataDto,
  filterTeacherResearchAndExtensionProjectsDataDtoSchema,
} from "@unidash/api/dtos/teacherResearchAndExtensionProjectsData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllTeacherResearchAndExtensionProjectsDataParams =
  FilterTeacherResearchAndExtensionProjectsDataDto & PaginationDto;

export class TeacherResearchAndExtensionProjectsDataParamsBuilder extends BaseParamsBuilder<FilterTeacherResearchAndExtensionProjectsDataDto> {
  public applyFilters(
    filtersDto: FilterTeacherResearchAndExtensionProjectsDataDto
  ): this {
    const validatedFilters =
      filterTeacherResearchAndExtensionProjectsDataDtoSchema.safeParse(
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
