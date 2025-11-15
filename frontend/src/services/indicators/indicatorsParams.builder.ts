import {
  FilterIndicatorsDto,
  filterIndicatorsDtoSchema,
} from "@unidash/api/dtos/indicators.dto";
import { BaseParamsBuilder } from "../params/baseParams.builder";

export type GetAllIndicatorsParams = FilterIndicatorsDto;

export class IndicatorsParamsBuilder extends BaseParamsBuilder<FilterIndicatorsDto> {
  public applyFilters(filtersDto: FilterIndicatorsDto): this {
    const validatedFilters = filterIndicatorsDtoSchema.parse(filtersDto);

    if (validatedFilters?.yearFrom) {
      this.params["yearFrom"] = validatedFilters.yearFrom;
    }

    if (validatedFilters?.yearTo) {
      this.params["yearTo"] = validatedFilters.yearTo;
    }

    if (validatedFilters?.semester) {
      this.params["semester"] = validatedFilters.semester;
    }

    return this;
  }
}
