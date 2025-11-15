import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCompletionWorkDataSSRService } from "@unidash/services/courseCompletionWorkData/courseCompletionWorkData.ssr.service";
import { EditCourseCompletionWorkDataForm } from "../../_components/EditCourseCompletionWorkDataForm";

interface EditCourseCompletionWorkPageProps {
  params: Promise<{ courseCompletionWorkDataId: string }>;
}

export default async function EditCourseCompletionWorkPage({
  params,
}: EditCourseCompletionWorkPageProps) {
  const { courseCompletionWorkDataId } = await params;

  const { courseCompletionWorkData } =
    await CourseCompletionWorkDataSSRService.getById(
      courseCompletionWorkDataId
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de TCCs"
        breadcrumbItems={[
          {
            label: "Dados de TCCs do cuso",
            link: APP_ROUTES.private.courseCompletionWorkData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseCompletionWorkDataForm
        courseCompletionWorkData={courseCompletionWorkData}
      />
    </>
  );
}
