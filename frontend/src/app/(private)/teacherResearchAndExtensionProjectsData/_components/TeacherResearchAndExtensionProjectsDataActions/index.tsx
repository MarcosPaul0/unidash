import { DeleteTeacherResearchAndExtensionProjectsDataDialog } from "../DeleteTeacherResearchAndExtensionProjectsDataDialog";
import { TeacherResearchAndExtensionProjectsDataActionsProps } from "./teacherResearchAndExtensionProjectsDataActions.interface";

export function TeacherResearchAndExtensionProjectsDataActions({
  teacherResearchAndExtensionProjectsDataId,
}: TeacherResearchAndExtensionProjectsDataActionsProps) {
  return (
    <>
      <DeleteTeacherResearchAndExtensionProjectsDataDialog
        teacherResearchAndExtensionProjectsDataId={
          teacherResearchAndExtensionProjectsDataId
        }
      />
    </>
  );
}
