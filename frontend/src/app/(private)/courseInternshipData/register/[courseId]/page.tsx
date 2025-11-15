import { Toolbar } from "../../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseInternshipDataForm } from "../../_components/CourseInternshipDataForm";
import { TeacherCoursesSSRService } from "@unidash/services/teacherCourse/teacherCourse.ssr.service";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

interface RegisterCourseInternshipPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function RegisterCourseInternshipPage({
  params,
}: RegisterCourseInternshipPageProps) {
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
        breadcrumbPage="Novo registro de estágio do curso"
        breadcrumbItems={[
          {
            label: "Dados de estágios do cuso",
            link: APP_ROUTES.private.courseInternshipData,
            fromCourse: true,
          },
        ]}
      />

      <CourseInternshipDataForm teachersOptions={teacherCoursesOptions} />
    </>
  );
}
