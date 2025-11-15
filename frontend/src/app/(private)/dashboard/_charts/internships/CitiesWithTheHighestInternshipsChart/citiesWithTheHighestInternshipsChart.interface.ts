import { CourseInternshipIndicatorsResponse } from "@unidash/api/responses/indicators.response";

export interface CitiesWithTheHighestInternshipsChartProps {
  internshipsByCity?: CourseInternshipIndicatorsResponse["internshipsByCity"];
}
