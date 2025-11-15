import { CourseCoordinationIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface ServicesProvidedByCoordinationChartProps {
  services: CourseCoordinationIndicatorsResponse["services"];
  yearFrom: number | null;
  yearTo: number | null;
}
