import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { RegisterCourseForm } from "../_components/RegisterCourseForm";

export default async function RegisterCoursePage() {
  return (
    <>
      <Toolbar
        breadcrumbItems={[
          { label: "Lista de cursos", link: APP_ROUTES.private.courses },
        ]}
        breadcrumbPage="Novo curso"
      />

      <RegisterCourseForm />
    </>
  );
}
