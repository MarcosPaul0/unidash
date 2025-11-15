import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseExtensionActivitiesDataForm } from "../_components/CourseExtensionActivitiesDataForm";

export default function RegisterCourseExtensionActivitiesPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de atividades de extensão do curso"
        breadcrumbItems={[
          {
            label: "Dados de atividades de extensão do cuso",
            link: APP_ROUTES.private.courseExtensionActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <CourseExtensionActivitiesDataForm />
    </>
  );
}
