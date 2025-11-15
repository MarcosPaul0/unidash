import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@unidash/components/Tooltip";
import { StudentActionsProps } from "./studentActions.interface";
import { DeleteStudentDialog } from "../DeleteStudentDialog";

export function StudentActions({ studentId }: StudentActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editStudent}${studentId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar aluno</TooltipContent>
      </Tooltip>

      <DeleteStudentDialog studentId={studentId} />
    </>
  );
}
