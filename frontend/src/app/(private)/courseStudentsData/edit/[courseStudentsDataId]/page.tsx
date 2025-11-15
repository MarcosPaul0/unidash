import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseStudentsDataSSRService } from "@unidash/services/courseStudentsData/courseStudentsData.ssr.service";
import { EditCourseStudentsDataForm } from "../../_components/EditCourseStudentsDataForm";

interface EditCourseStudentsPageProps {
  params: Promise<{ courseStudentsDataId: string }>;
}

export default async function EditCourseStudentsPage({
  params,
}: EditCourseStudentsPageProps) {
  const { courseStudentsDataId } = await params;

  const { courseStudentsData } = await CourseStudentsDataSSRService.getById(
    courseStudentsDataId
  );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de alunos"
        breadcrumbItems={[
          {
            label: "Dados de alunos do cuso",
            link: APP_ROUTES.private.courseStudentsData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseStudentsDataForm courseStudentsData={courseStudentsData} />
    </>
  );
}
