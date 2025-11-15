import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseRegistrationLockDataSSRService } from "@unidash/services/courseRegistrationLockData/courseRegistrationLockData.ssr.service";
import { EditCourseRegistrationLockDataForm } from "../../_components/EditCourseRegistrationLockDataForm";

interface EditCourseRegistrationLockPageProps {
  params: Promise<{ courseRegistrationLockDataId: string }>;
}

export default async function EditCourseRegistrationLockPage({
  params,
}: EditCourseRegistrationLockPageProps) {
  const { courseRegistrationLockDataId } = await params;

  const { courseRegistrationLockData } =
    await CourseRegistrationLockDataSSRService.getById(
      courseRegistrationLockDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de trancamentos"
        breadcrumbItems={[
          {
            label: "Dados de trancamentos do curso",
            link: APP_ROUTES.private.courseRegistrationLockData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseRegistrationLockDataForm
        courseRegistrationLockData={courseRegistrationLockData}
      />
    </>
  );
}
