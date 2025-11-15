import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseTeacherWorkloadDataSSRService } from "@unidash/services/courseTeacherWorkloadData/courseTeacherWorkloadData.ssr.service";
import { EditCourseTeacherWorkloadDataForm } from "../../_components/EditCourseTeacherWorkloadDataForm";
import { TeacherCoursesSSRService } from "@unidash/services/teacherCourse/teacherCourse.ssr.service";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

interface EditCourseTeacherWorkloadPageProps {
  params: Promise<{ courseTeacherWorkloadDataId: string; courseId: string }>;
}

export default async function EditCourseTeacherWorkloadPage({
  params,
}: EditCourseTeacherWorkloadPageProps) {
  const { courseTeacherWorkloadDataId } = await params;

  const { courseTeacherWorkloadData } =
    await CourseTeacherWorkloadDataSSRService.getById(
      courseTeacherWorkloadDataId
    );

  const teacherCoursesResponse = await TeacherCoursesSSRService.getAllByCourse(
    courseTeacherWorkloadData.courseId
  );

  const teacherCoursesOptions: SelectOption[] =
    teacherCoursesResponse.teacherCourses.map((teacherCourse) => ({
      label: teacherCourse.name,
      value: teacherCourse.teacherId,
    }));

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de carga horária do docente"
        breadcrumbItems={[
          {
            label: "Dados de carga horária do docente no curso",
            link: APP_ROUTES.private.courseTeacherWorkloadData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseTeacherWorkloadDataForm
        teachersOptions={teacherCoursesOptions}
        courseTeacherWorkloadData={courseTeacherWorkloadData}
      />
    </>
  );
}
