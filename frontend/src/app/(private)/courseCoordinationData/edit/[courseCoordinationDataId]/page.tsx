import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCoordinationDataSSRService } from "@unidash/services/courseCoordinationData/courseCoordinationData.ssr.service";
import { EditCourseCoordinationDataForm } from "../../_components/EditCourseCoordinationDataForm";

interface EditCourseCoordinationPageProps {
  params: Promise<{ courseCoordinationDataId: string }>;
}

export default async function EditCourseCoordinationPage({
  params,
}: EditCourseCoordinationPageProps) {
  const { courseCoordinationDataId } = await params;

  const { courseCoordinationData } =
    await CourseCoordinationDataSSRService.getById(courseCoordinationDataId);

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro da coordenação do curso"
        breadcrumbItems={[
          {
            label: "Dados da coordenação do cuso",
            link: APP_ROUTES.private.courseCoordinationData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseCoordinationDataForm
        courseCoordinationData={courseCoordinationData}
      />
    </>
  );
}
