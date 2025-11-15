import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseStudentsDataDialog } from "../DeleteCourseStudentsDataDialog";
import { CourseStudentsDataActionsProps } from "./courseStudentsDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseStudentsDataActions({
  courseStudentsDataId,
}: CourseStudentsDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseStudentsData}${courseStudentsDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar registro de alunos</TooltipContent>
      </Tooltip>

      <DeleteCourseStudentsDataDialog
        courseStudentsDataId={courseStudentsDataId}
      />
    </>
  );
}
