import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { CourseSSRService } from "@unidash/services/course/course.ssr.service";
import { TeacherCourseTable } from "../../_components/TeacherCourseTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { AddTeacherPopover } from "../../_components/AddTeacherPopover";
import { APP_ROUTES } from "@unidash/routes/app.routes";

interface ListCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function ListCoursePage({ params }: ListCoursePageProps) {
  const currentParams = await params;

  const courseResponse = await CourseSSRService.getById(currentParams.courseId);

  return (
    <>
      <Toolbar
        breadcrumbItems={[
          {
            label: "Lista de cursos",
            link: APP_ROUTES.private.courses,
          },
        ]}
        breadcrumbPage="Docentes do curso"
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Docentes do curso de {courseResponse.course.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 md:gap-8">
          <AddTeacherPopover courseId={currentParams.courseId} />

          <TeacherCourseTable courseId={currentParams.courseId} />
        </CardContent>
      </Card>
    </>
  );
}
