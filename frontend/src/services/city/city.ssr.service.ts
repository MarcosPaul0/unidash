import { UNIDASH_API_ROUTES } from "@unidash/routes/unidashApi.routes";
import { createApiSSRClient } from "@unidash/lib/apiClientSSR";
import { CityParamsBuilder } from "./cityParams.builder";
import { CitiesResponse } from "@unidash/api/responses/city.response";
import { FilterCityDto, filterCityDtoSchema } from "@unidash/api/dtos/city.dto";

export class CitySSRService {
  static async getAll(filters?: FilterCityDto): Promise<CitiesResponse> {
    const validatedFilters = filterCityDtoSchema.parse(filters);

    const params = new CityParamsBuilder()
      .applyFilters(validatedFilters)
      .build();

    const ssrApiClient = await createApiSSRClient();

    const citiesResponse = await ssrApiClient.get<CitiesResponse>(
      UNIDASH_API_ROUTES.city.getAll,
      {
        params,
      }
    );

    return citiesResponse;
  }
}
