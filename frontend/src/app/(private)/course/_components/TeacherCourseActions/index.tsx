import { TeacherCourseActionsProps } from "./teacherCourseActions.interface";
import { DeleteTeacherCourseDialog } from "../DeleteTeacherCourseDialog";

export function TeacherCourseActions({
  teacherCourseId,
}: TeacherCourseActionsProps) {
  return (
    <>
      <DeleteTeacherCourseDialog teacherCourseId={teacherCourseId} />
    </>
  );
}
