import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherTechnicalScientificProductionsDataForm } from "../_components/TeacherTechnicalScientificProductionsDataForm";

export default function RegisterTeacherTechnicalScientificProductionsDataPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de produções técnico-científicas"
        breadcrumbItems={[
          {
            label: "Indicadores de produções técnico-científicas",
            link: APP_ROUTES.private.teacherTechnicalScientificProductionsData,
          },
        ]}
      />

      <TeacherTechnicalScientificProductionsDataForm />
    </>
  );
}
