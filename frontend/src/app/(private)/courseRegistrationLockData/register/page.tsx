import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseRegistrationLockDataForm } from "../_components/CourseRegistrationLockDataForm";

export default function RegisterCourseRegistrationLockPage() {
  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de trancamentos"
        breadcrumbItems={[
          {
            label: "Dados de trancamentos do cuso",
            link: APP_ROUTES.private.courseRegistrationLockData,
            fromCourse: true,
          },
        ]}
      />

      <CourseRegistrationLockDataForm />
    </>
  );
}
