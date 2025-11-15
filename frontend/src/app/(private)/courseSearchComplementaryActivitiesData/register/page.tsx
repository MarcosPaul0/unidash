import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseSearchComplementaryActivitiesDataForm } from "../_components/CourseSearchComplementaryActivitiesDataForm";

export default function RegisterCourseSearchComplementaryActivitiesPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de atividades complementares de pesquisa"
        breadcrumbItems={[
          {
            label: "Dados de atividades complementares de pesquisa do cuso",
            link: APP_ROUTES.private.courseSearchComplementaryActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <CourseSearchComplementaryActivitiesDataForm />
    </>
  );
}
