import { CourseCoordinationIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface DistributionCoordinationMeetingsChartProps {
  meetings: CourseCoordinationIndicatorsResponse["meetings"];
  yearFrom: number | null;
  yearTo: number | null;
}
