import { FilterIndicatorsDto } from "@unidash/api/dtos/indicators.dto";

export interface UseFetchIndicatorsParams<T> {
  fetchIndicators: (
    courseId: string,
    filters: FilterIndicatorsDto
  ) => Promise<T>;
}
