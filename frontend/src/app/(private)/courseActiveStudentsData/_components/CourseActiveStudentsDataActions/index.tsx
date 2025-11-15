import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseActiveStudentsDataDialog } from "../DeleteCourseActiveStudentsDataDialog";
import { CourseActiveStudentsDataActionsProps } from "./courseActiveStudentsDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseActiveStudentsDataActions({
  courseActiveStudentsDataId,
}: CourseActiveStudentsDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseActiveStudentsData}${courseActiveStudentsDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar registro de alunos ativos</TooltipContent>
      </Tooltip>

      <DeleteCourseActiveStudentsDataDialog
        courseActiveStudentsDataId={courseActiveStudentsDataId}
      />
    </>
  );
}
