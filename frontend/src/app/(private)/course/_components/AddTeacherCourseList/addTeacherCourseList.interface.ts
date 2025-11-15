import { TeachersResponse } from "@unidash/api/responses/teacher.response";
import { Dispatch, SetStateAction } from "react";

export interface AddTeacherCourseListProps {
  teachers: TeachersResponse["teachers"];
  setTeachersOutsideOfCourse: Dispatch<
    SetStateAction<TeachersResponse["teachers"]>
  >;
}
