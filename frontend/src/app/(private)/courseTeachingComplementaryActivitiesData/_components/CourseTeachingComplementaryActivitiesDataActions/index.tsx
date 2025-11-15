import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseTeachingComplementaryActivitiesDataDialog } from "../DeleteCourseTeachingComplementaryActivitiesDataDialog";
import { CourseTeachingComplementaryActivitiesDataActionsProps } from "./courseTeachingComplementaryActivitiesDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseTeachingComplementaryActivitiesDataActions({
  courseTeachingComplementaryActivitiesDataId,
}: CourseTeachingComplementaryActivitiesDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseTeachingComplementaryActivitiesData}${courseTeachingComplementaryActivitiesDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>
          Editar registro de atividades complementares de ensino
        </TooltipContent>
      </Tooltip>

      <DeleteCourseTeachingComplementaryActivitiesDataDialog
        courseTeachingComplementaryActivitiesDataId={
          courseTeachingComplementaryActivitiesDataId
        }
      />
    </>
  );
}
