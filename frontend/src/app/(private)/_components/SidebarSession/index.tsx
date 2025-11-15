import {
  BookBookmarkIcon,
  ChalkboardTeacherIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@unidash/assets/svgs/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@unidash/components/Sidebar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { SidebarLink } from "../SidebarLink";
import { SidebarSignOutButton } from "../SidebarSignOutButton";
import { SidebarIndicatorsCollapsible } from "../SidebarIndicatorsCollapsible";
import { SidebarStudentsLink } from "../SidebarStudentsLink";
import { Can } from "@unidash/components/Can";

export function SidebarSession() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="gap-3">
          <SidebarLink
            text="Dashboard"
            href={APP_ROUTES.private.dashboard}
            icon={<SquaresFourIcon />}
          />

          <Can allowedRoles={["admin"]}>
            <SidebarLink
              text="Cursos"
              href={APP_ROUTES.private.courses}
              icon={<BookBookmarkIcon />}
            />

            <SidebarLink
              text="Docentes"
              href={APP_ROUTES.private.teachers}
              icon={<ChalkboardTeacherIcon />}
            />
          </Can>

          <Can
            allowedRoles={["admin", "teacher"]}
            allowedTeacherRoles={["courseManagerTeacher"]}
          >
            <SidebarStudentsLink />
          </Can>

          <Can allowedRoles={["admin", "teacher"]}>
            <SidebarIndicatorsCollapsible />
          </Can>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
