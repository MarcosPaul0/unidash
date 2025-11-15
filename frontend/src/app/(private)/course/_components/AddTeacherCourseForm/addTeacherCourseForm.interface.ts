import { TeachersResponse } from "@unidash/api/responses/teacher.response";

export interface AddTeacherCourseFormProps {
  courseId: string;
  onSearchTeachersOutsideOfCourse: (teachersResponse: TeachersResponse) => void;
  handleOpenTeachersList: () => void;
}
