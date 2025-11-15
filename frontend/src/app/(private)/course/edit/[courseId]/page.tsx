import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseSSRService } from "@unidash/services/course/course.ssr.service";
import { Suspense } from "react";
import { EditCourseForm } from "../../_components/EditCourseForm";
import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";

interface EditCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;

  const courseResponse = await CourseSSRService.getById(courseId);

  return (
    <>
      <Toolbar
        breadcrumbItems={[
          { label: "Lista de cursos", link: APP_ROUTES.private.courses },
        ]}
        breadcrumbPage="Editar curso"
      />

      <Suspense fallback={<div>carregando...</div>}>
        <EditCourseForm course={courseResponse.course} />
      </Suspense>
    </>
  );
}
