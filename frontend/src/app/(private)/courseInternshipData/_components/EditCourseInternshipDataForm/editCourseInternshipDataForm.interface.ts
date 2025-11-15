import { CourseInternshipDataResponse } from "@unidash/api/responses/courseInternshipDataResponse.interface";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

export interface EditCourseInternshipDataFormProps {
  teachersOptions: SelectOption[];
  courseInternshipData: CourseInternshipDataResponse["courseInternshipData"];
}
