import { DeleteCourseInternshipDataDialog } from "../DeleteCourseInternshipDataDialog";
import { CourseInternshipDataActionsProps } from "./courseInternshipDataActions.interface";

export function CourseInternshipDataActions({
  courseInternshipDataId,
}: CourseInternshipDataActionsProps) {
  return (
    <>
      <DeleteCourseInternshipDataDialog
        courseInternshipDataId={courseInternshipDataId}
      />
    </>
  );
}
