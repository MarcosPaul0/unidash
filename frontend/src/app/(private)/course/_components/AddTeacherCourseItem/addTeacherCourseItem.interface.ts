import {
  TeacherResponse,
  TeachersResponse,
} from "@unidash/api/responses/teacher.response";
import { Dispatch, SetStateAction } from "react";

export interface AddTeacherCourseItemProps {
  teacher: TeacherResponse["teacher"];
  setTeachersOutsideOfCourse: Dispatch<
    SetStateAction<TeachersResponse["teachers"]>
  >;
}
