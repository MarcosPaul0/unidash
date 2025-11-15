import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { EditCourseInternshipDataForm } from "../../_components/EditCourseInternshipDataForm";
import { CourseInternshipDataSSRService } from "@unidash/services/courseInternshipData/courseInternshipData.ssr.service";
import { TeacherCoursesSSRService } from "@unidash/services/teacherCourse/teacherCourse.ssr.service";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

interface EditCourseInternshipPageProps {
  params: Promise<{ courseInternshipDataId: string; courseId: string }>;
}

export default async function EditCourseInternshipPage({
  params,
}: EditCourseInternshipPageProps) {
  const { courseInternshipDataId, courseId } = await params;

  const { courseInternshipData } = await CourseInternshipDataSSRService.getById(
    courseInternshipDataId
  );

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
        breadcrumbPage="Editar registro de estágio do curso"
        breadcrumbItems={[
          {
            label: "Dados de estágio do curso",
            link: APP_ROUTES.private.courseInternshipData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseInternshipDataForm
        teachersOptions={teacherCoursesOptions}
        courseInternshipData={courseInternshipData}
      />
    </>
  );
}
