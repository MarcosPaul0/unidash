import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseSearchComplementaryActivitiesDataSSRService } from "@unidash/services/courseSearchComplementaryActivitiesData/courseSearchComplementaryActivitiesData.ssr.service";
import { EditCourseSearchComplementaryActivitiesDataForm } from "../../_components/EditCourseSearchComplementaryActivitiesDataForm";

interface EditCourseSearchComplementaryActivitiesPageProps {
  params: Promise<{ courseSearchComplementaryActivitiesDataId: string }>;
}

export default async function EditCourseSearchComplementaryActivitiesPage({
  params,
}: EditCourseSearchComplementaryActivitiesPageProps) {
  const { courseSearchComplementaryActivitiesDataId } = await params;

  const { courseSearchComplementaryActivitiesData } =
    await CourseSearchComplementaryActivitiesDataSSRService.getById(
      courseSearchComplementaryActivitiesDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de atividades complementares de pesquisa"
        breadcrumbItems={[
          {
            label: "Dados de atividades complementares de pesquisa do cuso",
            link: APP_ROUTES.private.courseSearchComplementaryActivitiesData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseSearchComplementaryActivitiesDataForm
        courseSearchComplementaryActivitiesData={
          courseSearchComplementaryActivitiesData
        }
      />
    </>
  );
}
