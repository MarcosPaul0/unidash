import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherResearchAndExtensionProjectsDataForm } from "../_components/TeacherResearchAndExtensionProjectsDataForm";

export default function RegisterTeacherResearchAndExtensionProjectsDataPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de projetos de pesquisa e extensão"
        breadcrumbItems={[
          {
            label: "Indicadores de projetos de pesquisa e extensão",
            link: APP_ROUTES.private.teacherResearchAndExtensionProjectsData,
          },
        ]}
      />

      <TeacherResearchAndExtensionProjectsDataForm />
    </>
  );
}
