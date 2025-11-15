import { CourseWorkCompletionIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface WorkStatusChartProps {
  worksStatus?: CourseWorkCompletionIndicatorsResponse["worksStatus"];
}
