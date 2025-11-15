import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseExtensionActivitiesDataDialog } from "../DeleteCourseExtensionActivitiesDataDialog";
import { CourseExtensionActivitiesDataActionsProps } from "./courseExtensionActivitiesDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseExtensionActivitiesDataActions({
  courseExtensionActivitiesDataId,
}: CourseExtensionActivitiesDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseExtensionActivitiesData}${courseExtensionActivitiesDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>
          Editar registro de atividades de extensão
        </TooltipContent>
      </Tooltip>

      <DeleteCourseExtensionActivitiesDataDialog
        courseExtensionActivitiesDataId={courseExtensionActivitiesDataId}
      />
    </>
  );
}
