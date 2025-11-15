import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseTeachingComplementaryActivitiesDataSSRService } from "@unidash/services/courseTeachingComplementaryActivitiesData/courseTeachingComplementaryActivitiesData.ssr.service";
import { EditCourseTeachingComplementaryActivitiesDataForm } from "../../_components/EditCourseTeachingComplementaryActivitiesDataForm";

interface EditCourseTeachingComplementaryActivitiesPageProps {
  params: Promise<{ courseTeachingComplementaryActivitiesDataId: string }>;
}

export default async function EditCourseTeachingComplementaryActivitiesPage({
  params,
}: EditCourseTeachingComplementaryActivitiesPageProps) {
  const { courseTeachingComplementaryActivitiesDataId } = await params;

  const { courseTeachingComplementaryActivitiesData } =
    await CourseTeachingComplementaryActivitiesDataSSRService.getById(
      courseTeachingComplementaryActivitiesDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de atividades complementares de ensino"
        breadcrumbItems={[
          {
            label: "Dados de atividades complementares de ensino do curso",
            link: APP_ROUTES.private.courseTeachingComplementaryActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseTeachingComplementaryActivitiesDataForm
        courseTeachingComplementaryActivitiesData={
          courseTeachingComplementaryActivitiesData
        }
      />
    </>
  );
}
