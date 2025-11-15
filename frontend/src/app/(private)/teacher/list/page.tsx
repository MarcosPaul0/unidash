import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { TeachersTable } from "../_components/TeachersTable";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherSSRService } from "@unidash/services/teacher/teacher.ssr.service";
import { TablePagination } from "../../_components/TablePagination";
import { Suspense } from "react";
import { GetAllTeachersParams } from "@unidash/services/teacher/teacherParams.builder";

interface ListTeacherPageProps {
  searchParams: Promise<GetAllTeachersParams>;
}

export default async function ListTeacherPage({
  searchParams,
}: ListTeacherPageProps) {
  const searchParamsResult = await searchParams;

  const teachersResponse = await TeacherSSRService.getAll(
    {
      itemsPerPage: Number(process.env.ITEMS_PER_PAGE),
      page: searchParamsResult?.page,
    },
    {
      isActive: searchParamsResult?.isActive,
      name: searchParamsResult?.name,
    }
  );

  return (
    <>
      <Toolbar
        breadcrumbPage="Lista de docentes"
        addLink={{
          link: APP_ROUTES.private.registerTeacher,
          label: "Novo docente",
        }}
      />

      <Suspense fallback={<div>carregando...</div>}>
        <TeachersTable teachers={teachersResponse.teachers} />
        <TablePagination totalPages={teachersResponse.totalPages} />
      </Suspense>
    </>
  );
}
