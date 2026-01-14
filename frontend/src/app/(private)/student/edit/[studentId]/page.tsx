import { Toolbar } from "../../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { EditStudentForm } from "../../_components/EditStudentForm";
import { StudentSSRService } from "@unidash/services/student/student.ssr.service";

interface EditStudentPageProps {
  params: Promise<{ studentId: string }>;
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { studentId } = await params;

  const studentResponse = await StudentSSRService.getById(studentId);

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar aluno"
        breadcrumbItems={[
          {
            label: "Lista de alunos",
            link: `${APP_ROUTES.private.student}${studentResponse.student.courseId}`,
          },
        ]}
      />

      <EditStudentForm student={studentResponse.student} />
    </>
  );
}
