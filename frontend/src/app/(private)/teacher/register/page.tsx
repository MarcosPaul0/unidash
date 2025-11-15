import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { RegisterTeacherForm } from "../_components/RegisterTeacherForm";

export default async function RegisterTeacherPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo docente"
        breadcrumbItems={[
          { label: "Lista de docentes", link: APP_ROUTES.private.teachers },
        ]}
      />

      <RegisterTeacherForm />
    </>
  );
}
