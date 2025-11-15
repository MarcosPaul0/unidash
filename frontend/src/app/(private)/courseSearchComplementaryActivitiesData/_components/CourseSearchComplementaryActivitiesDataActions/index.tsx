import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseSearchComplementaryActivitiesDataDialog } from "../DeleteCourseSearchComplementaryActivitiesDataDialog";
import { CourseSearchComplementaryActivitiesDataActionsProps } from "./courseSearchComplementaryActivitiesDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseSearchComplementaryActivitiesDataActions({
  courseSearchComplementaryActivitiesDataId,
}: CourseSearchComplementaryActivitiesDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseSearchComplementaryActivitiesData}${courseSearchComplementaryActivitiesDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>
          Editar registro de atividades complementares de pesquisa
        </TooltipContent>
      </Tooltip>

      <DeleteCourseSearchComplementaryActivitiesDataDialog
        courseSearchComplementaryActivitiesDataId={
          courseSearchComplementaryActivitiesDataId
        }
      />
    </>
  );
}
