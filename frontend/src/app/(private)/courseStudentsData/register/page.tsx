import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseStudentsDataForm } from "../_components/CourseStudentsDataForm";

export default function RegisterCourseStudentsPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de alunos"
        breadcrumbItems={[
          {
            label: "Dados de alunos do cuso",
            link: APP_ROUTES.private.courseStudentsData,
            fromCourse: true,
          },
        ]}
      />

      <CourseStudentsDataForm />
    </>
  );
}
