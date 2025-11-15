import { CourseActiveStudentsDataListResponse } from "@unidash/api/responses/courseActiveStudentsDataResponse.interface";

export interface CourseActiveStudentsDataTableProps {
  courseActiveStudentsData: CourseActiveStudentsDataListResponse["courseActiveStudentsData"];
}
