import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { EditCourseActiveStudentsDataForm } from "../../_components/EditCourseActiveStudentsDataForm";
import { CourseActiveStudentsDataSSRService } from "@unidash/services/courseActiveStudentsData/courseActiveStudentsData.ssr.service";

interface EditCourseActiveStudentsPageProps {
  params: Promise<{ courseActiveStudentsDataId: string }>;
}

export default async function EditCourseActiveStudentsPage({
  params,
}: EditCourseActiveStudentsPageProps) {
  const { courseActiveStudentsDataId } = await params;

  const { courseActiveStudentsData } =
    await CourseActiveStudentsDataSSRService.getById(
      courseActiveStudentsDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de alunos ativos"
        breadcrumbItems={[
          {
            label: "Dados de alunos ativos do cuso",
            link: APP_ROUTES.private.courseActiveStudentsData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseActiveStudentsDataForm
        courseActiveStudentsData={courseActiveStudentsData}
      />
    </>
  );
}
