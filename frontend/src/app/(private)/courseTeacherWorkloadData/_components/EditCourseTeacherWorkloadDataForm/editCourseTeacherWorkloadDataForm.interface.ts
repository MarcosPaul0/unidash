import { CourseTeacherWorkloadDataResponse } from "@unidash/api/responses/courseTeacherWorkloadDataResponse.interface";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

export interface EditCourseTeacherWorkloadDataFormProps {
  teachersOptions: SelectOption[];
  courseTeacherWorkloadData: CourseTeacherWorkloadDataResponse["courseTeacherWorkloadData"];
}
