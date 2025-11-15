import { CourseIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface TeacherHoursDistributionChartProps {
  teachersWorkload?: CourseIndicatorsResponse["teachersWorkload"];
}
