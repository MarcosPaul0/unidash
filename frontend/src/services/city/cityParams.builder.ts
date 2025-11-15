import { FilterCityDto } from "@unidash/api/dtos/city.dto";

export type GetAllCityParams = FilterCityDto;

export class CityParamsBuilder {
  private params: NonNullable<GetAllCityParams> = {};

  public applyFilters(filterCityDto: FilterCityDto) {
    if (filterCityDto?.name) {
      this.params["name"] = filterCityDto.name;
    }

    return this;
  }

  public build() {
    return this.params;
  }
}
