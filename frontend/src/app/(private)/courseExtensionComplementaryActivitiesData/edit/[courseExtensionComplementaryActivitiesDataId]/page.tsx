import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseExtensionComplementaryActivitiesDataSSRService } from "@unidash/services/courseExtensionComplementaryActivitiesData/courseExtensionComplementaryActivitiesData.ssr.service";
import { EditCourseExtensionComplementaryActivitiesDataForm } from "../../_components/EditCourseExtensionComplementaryActivitiesDataForm";

interface EditCourseExtensionComplementaryActivitiesPageProps {
  params: Promise<{ courseExtensionComplementaryActivitiesDataId: string }>;
}

export default async function EditCourseExtensionComplementaryActivitiesPage({
  params,
}: EditCourseExtensionComplementaryActivitiesPageProps) {
  const { courseExtensionComplementaryActivitiesDataId } = await params;

  const { courseExtensionComplementaryActivitiesData } =
    await CourseExtensionComplementaryActivitiesDataSSRService.getById(
      courseExtensionComplementaryActivitiesDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de atividades complementares de extensão do curso"
        breadcrumbItems={[
          {
            label: "Dados de atividades complementares de extensão do cuso",
            link: APP_ROUTES.private.courseExtensionComplementaryActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseExtensionComplementaryActivitiesDataForm
        courseExtensionComplementaryActivitiesData={
          courseExtensionComplementaryActivitiesData
        }
      />
    </>
  );
}
