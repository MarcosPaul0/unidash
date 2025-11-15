import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseCoordinationDataDialog } from "../DeleteCourseCoordinationDataDialog";
import { CourseCoordinationDataActionsProps } from "./courseCoordinationDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export function CourseCoordinationDataActions({
  courseCoordinationDataId,
}: CourseCoordinationDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseCoordinationData}${courseCoordinationDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar registro da coordenação do curso</TooltipContent>
      </Tooltip>

      <DeleteCourseCoordinationDataDialog
        courseCoordinationDataId={courseCoordinationDataId}
      />
    </>
  );
}
