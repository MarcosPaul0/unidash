import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCompletionWorkDataForm } from "../_components/CourseCompletionWorkDataForm";

export default function RegisterCourseCompletionWorkDataPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de TCCs"
        breadcrumbItems={[
          {
            label: "Dados de TCCs do curso",
            link: APP_ROUTES.private.courseCompletionWorkData,
            fromCourse: true,
          },
        ]}
      />

      <CourseCompletionWorkDataForm />
    </>
  );
}
