import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseActionsProps } from "./courseActions.interface";
import { PencilIcon, UserListIcon } from "@phosphor-icons/react/dist/ssr";
import { DeleteCourseDialog } from "../DeleteCourseDialog";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@unidash/components/Tooltip";

export function CourseActions({ courseId }: CourseActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.courseTeachers}${courseId}`}
          >
            <UserListIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Docentes do curso</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            className="ml-1"
            href={`${APP_ROUTES.private.editCourse}${courseId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar curso</TooltipContent>
      </Tooltip>

      <DeleteCourseDialog courseId={courseId} />
    </>
  );
}
