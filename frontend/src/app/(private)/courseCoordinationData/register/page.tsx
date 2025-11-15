import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCoordinationDataForm } from "../_components/CourseCoordinationDataForm";

export default function RegisterCourseCoordinationPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro da coordenação do curso"
        breadcrumbItems={[
          {
            label: "Dados da coordenação do cuso",
            link: APP_ROUTES.private.courseCoordinationData,
            fromCourse: true,
          },
        ]}
      />

      <CourseCoordinationDataForm />
    </>
  );
}
