import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseTeachingComplementaryActivitiesDataForm } from "../_components/CourseTeachingComplementaryActivitiesDataForm";

export default function RegisterCourseTeachingComplementaryActivitiesPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de atividades complementares de ensino"
        breadcrumbItems={[
          {
            label: "Dados de atividades complementares de ensino do cuso",
            link: APP_ROUTES.private.courseTeachingComplementaryActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <CourseTeachingComplementaryActivitiesDataForm />
    </>
  );
}
