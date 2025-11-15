export interface CityResponse {
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CitiesResponse {
  cities: CityResponse["city"][];
}
