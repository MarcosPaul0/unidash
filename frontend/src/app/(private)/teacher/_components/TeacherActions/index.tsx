import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherActionsProps } from "./teacherActions.interface";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@unidash/components/Tooltip";
import { DeleteTeacherDialog } from "../DeleteTeacherDialog";

export function TeacherActions({ teacherId }: TeacherActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            className="ml-1"
            href={`${APP_ROUTES.private.editTeacher}${teacherId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar docente</TooltipContent>
      </Tooltip>

      <DeleteTeacherDialog teacherId={teacherId} />
    </>
  );
}
