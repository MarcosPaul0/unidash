"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@unidash/components/Collapsible";
import { SidebarLink } from "../SidebarLink";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CaretDownIcon, ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr";
import { useCourseStore } from "@unidash/store/course.store";
import { Can } from "@unidash/components/Can";

export function SidebarIndicatorsCollapsible() {
  const { activeCourse } = useCourseStore();

  const indicatorsLinkVariant = activeCourse ? "unselected" : "disabled";

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <span
          aria-label="button"
          className={`
              py-2 px-4 rounded-lg w-full text-button-foreground flex items-center
              gap-2 hover:bg-primary
            `}
        >
          <i className="text-2xl">
            <ChartLineUpIcon />
          </i>
          Dados do Curso
          <i className="text-sm ml-auto">
            <CaretDownIcon />
          </i>
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-4 mt-2 flex flex-col gap-1">
        <Can
          allowedRoles={["admin", "teacher"]}
          allowedTeacherRoles={["courseManagerTeacher"]}
        >
          <SidebarLink
            text="Alunos do Curso"
            href={`${APP_ROUTES.private.courseStudentsData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Alunos Ativos"
            href={`${APP_ROUTES.private.courseActiveStudentsData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Saídas do Curso"
            href={`${APP_ROUTES.private.courseDepartureData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Trancamentos do Curso"
            href={`${APP_ROUTES.private.courseRegistrationLockData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Coordenação"
            href={`${APP_ROUTES.private.courseCoordinationData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Ingressos"
            href={`${APP_ROUTES.private.studentIncomingData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Carga Horária"
            href={`${APP_ROUTES.private.courseTeacherWorkloadData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>

        <Can
          allowedRoles={["admin", "teacher"]}
          allowedTeacherRoles={["extensionsActivitiesManagerTeacher"]}
        >
          <SidebarLink
            text="Ativ. de Extensão"
            href={`${APP_ROUTES.private.courseExtensionActivitiesData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>

        <Can
          allowedRoles={["admin", "teacher"]}
          allowedTeacherRoles={["complementaryActivitiesManagerTeacher"]}
        >
          <SidebarLink
            text="Ativ. compl. Ensino"
            href={`${APP_ROUTES.private.courseTeachingComplementaryActivitiesData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Ativ. compl. Pesquisa"
            href={`${APP_ROUTES.private.courseSearchComplementaryActivitiesData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
          <SidebarLink
            text="Ativ. compl. Extensão"
            href={`${APP_ROUTES.private.courseExtensionComplementaryActivitiesData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>

        <Can
          allowedRoles={["admin", "teacher"]}
          allowedTeacherRoles={["internshipManagerTeacher"]}
        >
          <SidebarLink
            text="Estágios"
            href={`${APP_ROUTES.private.courseInternshipData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>

        <Can
          allowedRoles={["admin", "teacher"]}
          allowedTeacherRoles={["workCompletionManagerTeacher"]}
        >
          <SidebarLink
            text="TCC"
            href={`${APP_ROUTES.private.courseCompletionWorkData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>

        <Can allowedRoles={["teacher"]}>
          <SidebarLink
            text="Orientações de TCCs"
            href={`${APP_ROUTES.private.teacherSupervisedCompletionWorkData}${activeCourse?.id}`}
            size="sm"
            variant={indicatorsLinkVariant}
          />

          <SidebarLink
            text="Produções"
            href={APP_ROUTES.private.teacherTechnicalScientificProductionsData}
            size="sm"
            variant={indicatorsLinkVariant}
          />

          <SidebarLink
            text="Projetos"
            href={APP_ROUTES.private.teacherResearchAndExtensionProjectsData}
            size="sm"
            variant={indicatorsLinkVariant}
          />
        </Can>
        {/* 
        <SidebarLink
          text="Atv. complementar"
          href={APP_ROUTES.private.courseComplementaryActivities}
          size="sm"
          variant={indicatorsLinkVariant}
        />
        <SidebarLink
          text="Atv. de extensão"
          href={APP_ROUTES.private.courseExtensionActivitiesIndicator}
          size="sm"
          variant={indicatorsLinkVariant}
        />
        <SidebarLink
          text="Estágio"
          href={APP_ROUTES.private.courseInternshipIndicator}
          size="sm"
          variant={indicatorsLinkVariant}
        />
        <SidebarLink
          text="Ingressantes"
          href={APP_ROUTES.private.studentIngressIndicator}
          size="sm"
          variant={indicatorsLinkVariant}
        /> */}
      </CollapsibleContent>
    </Collapsible>
  );
}
