"use client";

import { APP_ROUTES } from "@unidash/routes/app.routes";
import { SidebarLink } from "../SidebarLink";
import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { useCourseStore } from "@unidash/store/course.store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";

export function SidebarStudentsLink() {
  const { activeCourse } = useCourseStore();

  if (!activeCourse) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <SidebarLink
            text="Alunos"
            href={APP_ROUTES.private.student}
            icon={<StudentIcon />}
            variant="disabled"
          />
        </TooltipTrigger>

        <TooltipContent>
          Selecione um cuso para visualizar a lista de alunos
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <SidebarLink
      text="Alunos"
      href={`${APP_ROUTES.private.student}${activeCourse?.id}`}
      icon={<StudentIcon />}
    />
  );
}
