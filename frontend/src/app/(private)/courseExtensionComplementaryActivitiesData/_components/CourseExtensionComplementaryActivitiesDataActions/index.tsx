import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseExtensionComplementaryActivitiesDataDialog } from "../DeleteCourseExtensionComplementaryActivitiesDataDialog";
import { CourseExtensionComplementaryActivitiesDataActionsProps } from "./courseExtensionComplementaryActivitiesDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseExtensionComplementaryActivitiesDataActions({
  courseExtensionComplementaryActivitiesDataId,
}: CourseExtensionComplementaryActivitiesDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseExtensionComplementaryActivitiesData}${courseExtensionComplementaryActivitiesDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>
          Editar registro de atividades complementares de extensão
        </TooltipContent>
      </Tooltip>

      <DeleteCourseExtensionComplementaryActivitiesDataDialog
        courseExtensionComplementaryActivitiesDataId={
          courseExtensionComplementaryActivitiesDataId
        }
      />
    </>
  );
}
