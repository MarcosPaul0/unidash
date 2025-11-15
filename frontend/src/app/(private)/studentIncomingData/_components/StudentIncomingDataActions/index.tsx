import { DeleteStudentIncomingDataDialog } from "../DeleteStudentIncomingDataDialog";
import { StudentIncomingDataActionsProps } from "./studentIncomingDataActions.interface";

export function StudentIncomingDataActions({
  studentIncomingDataId,
}: StudentIncomingDataActionsProps) {
  return (
    <>
      <DeleteStudentIncomingDataDialog
        studentIncomingDataId={studentIncomingDataId}
      />
    </>
  );
}
