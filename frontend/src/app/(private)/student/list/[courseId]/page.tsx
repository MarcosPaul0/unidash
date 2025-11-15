import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { StudentsTable } from "../../_components/StudentsTable";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { StudentSSRService } from "@unidash/services/student/student.ssr.service";
import { GetAllStudentsParams } from "@unidash/services/student/studentParams.builder";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListStudentsPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllStudentsParams>;
}

export default async function ListStudentsPage({
  params,
  searchParams,
}: ListStudentsPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const studentsResponse = await StudentSSRService.getStudentsByCourse(
    courseId,
    {
      itemsPerPage: environment.ITEMS_PER_PAGE,
      page: searchParamsResult?.page,
    }
  );

  return (
    <>
      <Toolbar
        breadcrumbPage="Lista de alunos"
        addLink={{
          label: "Novo aluno",
          link: APP_ROUTES.private.registerStudent,
        }}
      />

      <Suspense fallback="carregando">
        <StudentsTable students={studentsResponse.students} />
        <TablePagination totalPages={studentsResponse.totalPages} />
      </Suspense>
    </>
  );
}
