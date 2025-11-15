import { APP_ROUTES } from "@unidash/routes/app.routes";
import { EditTeacherForm } from "../../_components/EditTeacherForm";
import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { TeacherSSRService } from "@unidash/services/teacher/teacher.ssr.service";

interface EditTeacherPageProps {
  params: Promise<{ teacherId: string }>;
}

export default async function EditTeacherPage({
  params,
}: EditTeacherPageProps) {
  const { teacherId } = await params;

  const teacherResponse = await TeacherSSRService.getById(teacherId);

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar docente"
        breadcrumbItems={[
          { label: "Lista de docentes", link: APP_ROUTES.private.teachers },
        ]}
      />

      <EditTeacherForm teacher={teacherResponse.teacher} />
    </>
  );
}
