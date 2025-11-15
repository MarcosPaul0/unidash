import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { CoursesTable } from "../_components/CoursesTable";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseSSRService } from "@unidash/services/course/course.ssr.service";
import { GetAllCoursesParams } from "@unidash/services/course/courseParams.builder";

interface ListCoursePageProps {
  searchParams: Promise<GetAllCoursesParams>;
}

export default async function ListCoursePage({
  searchParams,
}: ListCoursePageProps) {
  const params = await searchParams;

  const coursesResponse = await CourseSSRService.getAll({
    name: params?.name,
  });

  return (
    <>
      <Toolbar
        breadcrumbPage="Lista de cursos"
        addLink={{
          label: "Novo curso",
          link: APP_ROUTES.private.registerCourse,
        }}
      />

      <CoursesTable courses={coursesResponse.courses} />
    </>
  );
}
