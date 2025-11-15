import { CourseStudentsListDataResponse } from "@unidash/api/responses/courseStudentsDataResponse.interface";

export interface CourseStudentsDataTableProps {
  courseStudentsData: CourseStudentsListDataResponse["courseStudentsData"];
}
