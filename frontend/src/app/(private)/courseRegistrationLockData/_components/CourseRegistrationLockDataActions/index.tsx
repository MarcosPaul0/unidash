import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseRegistrationLockDataDialog } from "../DeleteCourseRegistrationLockDataDialog";
import { CourseRegistrationLockDataActionsProps } from "./courseRegistrationLockDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";

export function CourseRegistrationLockDataActions({
  courseRegistrationLockDataId,
}: CourseRegistrationLockDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseRegistrationLockData}${courseRegistrationLockDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar registro de trancamentos</TooltipContent>
      </Tooltip>

      <DeleteCourseRegistrationLockDataDialog
        courseRegistrationLockDataId={courseRegistrationLockDataId}
      />
    </>
  );
}
