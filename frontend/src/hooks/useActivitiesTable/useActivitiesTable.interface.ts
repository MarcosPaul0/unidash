import { ActivitiesIndicators } from "@unidash/api/responses/indicators.response";

export interface UseActivitiesTableParams {
  data?: Record<string, ActivitiesIndicators>;
  labels: Record<string, string>;
}
