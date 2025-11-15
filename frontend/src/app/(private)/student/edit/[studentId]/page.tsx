import { Toolbar } from "../../../_components/Toolbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@unidash/components/Breadcrumb";
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
      <Toolbar>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={APP_ROUTES.private.courses}>
                Lista de alunos
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Editar aluno</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Toolbar>

      <EditStudentForm student={studentResponse.student} />
    </>
  );
}
