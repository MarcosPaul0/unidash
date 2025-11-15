import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseExtensionActivitiesDataSSRService } from "@unidash/services/courseExtensionActivitiesData/courseExtensionActivitiesData.ssr.service";
import { EditCourseExtensionActivitiesDataForm } from "../../_components/EditCourseExtensionActivitiesDataForm";

interface EditCourseExtensionActivitiesPageProps {
  params: Promise<{ courseExtensionActivitiesDataId: string }>;
}

export default async function EditCourseExtensionActivitiesPage({
  params,
}: EditCourseExtensionActivitiesPageProps) {
  const { courseExtensionActivitiesDataId } = await params;

  const { courseExtensionActivitiesData } =
    await CourseExtensionActivitiesDataSSRService.getById(
      courseExtensionActivitiesDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de atividades de extensão do curso"
        breadcrumbItems={[
          {
            label: "Dados de atividades de extensão do cuso",
            link: APP_ROUTES.private.courseExtensionActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseExtensionActivitiesDataForm
        courseExtensionActivitiesData={courseExtensionActivitiesData}
      />
    </>
  );
}
