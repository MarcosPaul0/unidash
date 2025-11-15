import { DeleteTeacherSupervisedCompletionWorkDataDialog } from "../DeleteTeacherSupervisedCompletionWorkDataDialog";
import { TeacherSupervisedCompletionWorkDataActionsProps } from "./teacherSupervisedCompletionWorkDataActions.interface";

export function TeacherSupervisedCompletionWorkDataActions({
  teacherSupervisedCompletionWorkDataId,
}: TeacherSupervisedCompletionWorkDataActionsProps) {
  return (
    <>
      <DeleteTeacherSupervisedCompletionWorkDataDialog
        teacherSupervisedCompletionWorkDataId={
          teacherSupervisedCompletionWorkDataId
        }
      />
    </>
  );
}
