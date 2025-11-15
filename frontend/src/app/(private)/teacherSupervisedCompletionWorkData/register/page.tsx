import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherSupervisedCompletionWorkDataForm } from "../_components/TeacherSupervisedCompletionWorkDataForm";

export default function RegisterTeacherSupervisedCompletionWorkDataPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de orientações em TCCs"
        breadcrumbItems={[
          {
            label: "Indicadores de orientações em TCCs",
            link: APP_ROUTES.private.teacherSupervisedCompletionWorkData,
          },
        ]}
      />

      <TeacherSupervisedCompletionWorkDataForm />
    </>
  );
}
