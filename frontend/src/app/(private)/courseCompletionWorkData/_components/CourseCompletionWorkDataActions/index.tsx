import { DeleteCourseCompletionWorkDataDialog } from "../DeleteCourseCompletionWorkDataDialog";
import { CourseCompletionWorkDataActionsProps } from "./courseCompletionWorkDataActions.interface";

export function CourseCompletionWorkDataActions({
  courseCompletionWorkDataId,
}: CourseCompletionWorkDataActionsProps) {
  return (
    <>
      <DeleteCourseCompletionWorkDataDialog
        courseCompletionWorkDataId={courseCompletionWorkDataId}
      />
    </>
  );
}
