import { Toolbar } from "../../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseTeacherWorkloadDataForm } from "../../_components/CourseTeacherWorkloadDataForm";
import { TeacherCoursesSSRService } from "@unidash/services/teacherCourse/teacherCourse.ssr.service";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

interface RegisterCourseTeacherWorkloadPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function RegisterCourseTeacherWorkloadPage({
  params,
}: RegisterCourseTeacherWorkloadPageProps) {
  const { courseId } = await params;

  const teacherCoursesResponse = await TeacherCoursesSSRService.getAllByCourse(
    courseId
  );

  const teacherCoursesOptions: SelectOption[] =
    teacherCoursesResponse.teacherCourses.map((teacherCourse) => ({
      label: teacherCourse.name,
      value: teacherCourse.teacherId,
    }));

  return (
    <>
      <Toolbar
        breadcrumbPage="Novo registro de carga horária do docente"
        breadcrumbItems={[
          {
            label: "Dados de carga horária do docente no curso",
            link: `${APP_ROUTES.private.courseTeacherWorkloadData}${courseId}`,
            fromCourse: true,
          },
        ]}
      />

      <CourseTeacherWorkloadDataForm teachersOptions={teacherCoursesOptions} />
    </>
  );
}
