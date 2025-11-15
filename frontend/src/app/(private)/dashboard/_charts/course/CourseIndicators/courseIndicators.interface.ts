import { CourseIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface CourseIndicatorsProps {
  indicators: CourseIndicatorsResponse | null;
}

export interface IndicatorsCardsProps {
  complements?: CourseIndicatorsResponse["complements"] | null;
}
