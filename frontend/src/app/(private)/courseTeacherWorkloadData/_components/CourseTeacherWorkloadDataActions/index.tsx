import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseTeacherWorkloadDataDialog } from "../DeleteCourseTeacherWorkloadDataDialog";
import { CourseTeacherWorkloadDataActionsProps } from "./courseTeacherWorkloadDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export function CourseTeacherWorkloadDataActions({
  courseTeacherWorkloadDataId,
}: CourseTeacherWorkloadDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseTeacherWorkloadData}${courseTeacherWorkloadDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>
          Editar registro da carga horária do docente do curso
        </TooltipContent>
      </Tooltip>

      <DeleteCourseTeacherWorkloadDataDialog
        courseTeacherWorkloadDataId={courseTeacherWorkloadDataId}
      />
    </>
  );
}
