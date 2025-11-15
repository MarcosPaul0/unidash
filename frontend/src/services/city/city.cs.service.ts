import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { apiClient } from "@unidash/lib/apiClient";
import { CityParamsBuilder } from "./cityParams.builder";
import { CitiesResponse } from "@unidash/api/responses/city.response";
import { FilterCityDto, filterCityDtoSchema } from "@unidash/api/dtos/city.dto";

export class CityCSService {
  static async getAll(filters?: FilterCityDto): Promise<CitiesResponse> {
    const validatedFilters = filterCityDtoSchema.parse(filters);

    const params = new CityParamsBuilder()
      .applyFilters(validatedFilters)
      .build();

    const citiesResponse = await apiClient.get<CitiesResponse>(
      UNIDASH_API_ROUTES.city.getAll,
      {
        params,
      }
    );

    return citiesResponse;
  }
}
