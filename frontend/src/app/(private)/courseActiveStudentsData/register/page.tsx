import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { RegisterCourseActiveStudentsDataForm } from "../_components/RegisterCourseActiveStudentsDataForm";

export default function RegisterCourseActiveStudentsPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de alunos ativos"
        breadcrumbItems={[
          {
            label: "Dados de alunos ativos do cuso",
            link: APP_ROUTES.private.courseActiveStudentsData,
            fromCourse: true,
          },
        ]}
      />

      <RegisterCourseActiveStudentsDataForm />
    </>
  );
}
