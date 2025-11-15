import { DeleteTeacherTechnicalScientificProductionsDataDialog } from "../DeleteTeacherTechnicalScientificProductionsDataDialog";
import { TeacherTechnicalScientificProductionsDataActionsProps } from "./teacherTechnicalScientificProductionsDataActions.interface";

export function TeacherTechnicalScientificProductionsDataActions({
  teacherTechnicalScientificProductionsDataId,
}: TeacherTechnicalScientificProductionsDataActionsProps) {
  return (
    <>
      <DeleteTeacherTechnicalScientificProductionsDataDialog
        teacherTechnicalScientificProductionsDataId={
          teacherTechnicalScientificProductionsDataId
        }
      />
    </>
  );
}
