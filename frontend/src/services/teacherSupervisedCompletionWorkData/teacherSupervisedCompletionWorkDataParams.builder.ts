import {
  FilterTeacherSupervisedCompletionWorkDataDto,
  filterTeacherSupervisedCompletionWorkDataDtoSchema,
} from "@unidash/api/dtos/teacherSupervisedCompletionWorkData.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";
import { PaginationDto } from "@unidash/api/dtos/pagination.dto";

export type GetAllTeacherSupervisedCompletionWorkDataParams =
  FilterTeacherSupervisedCompletionWorkDataDto & PaginationDto;

export class TeacherSupervisedCompletionWorkDataParamsBuilder extends BaseParamsBuilder<FilterTeacherSupervisedCompletionWorkDataDto> {
  public applyFilters(
    filtersDto: FilterTeacherSupervisedCompletionWorkDataDto
  ): this {
    const validatedFilters =
      filterTeacherSupervisedCompletionWorkDataDtoSchema.safeParse(filtersDto);

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
