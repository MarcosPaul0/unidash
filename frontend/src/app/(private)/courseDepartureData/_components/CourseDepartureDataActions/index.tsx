import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { DeleteCourseDepartureDataDialog } from "../DeleteCourseDepartureDataDialog";
import { CourseDepartureDataActionsProps } from "./courseDepartureDataActions.interface";
import { LinkButton } from "@unidash/components/LinkButton";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr";
import { APP_ROUTES } from "@unidash/routes/app.routes";

export function CourseDepartureDataActions({
  courseDepartureDataId,
}: CourseDepartureDataActionsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <LinkButton
            size="icon"
            variant="filled"
            href={`${APP_ROUTES.private.editCourseDepartureData}${courseDepartureDataId}`}
          >
            <PencilIcon />
          </LinkButton>
        </TooltipTrigger>

        <TooltipContent>Editar registro de saídas</TooltipContent>
      </Tooltip>

      <DeleteCourseDepartureDataDialog
        courseDepartureDataId={courseDepartureDataId}
      />
    </>
  );
}
