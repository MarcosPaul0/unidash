import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherSupervisedCompletionWorkDataTable } from "../../_components/TeacherSupervisedCompletionWorkDataTable";
import { GetAllTeacherSupervisedCompletionWorkDataParams } from "@unidash/services/teacherSupervisedCompletionWorkData/teacherSupervisedCompletionWorkDataParams.builder";
import { TeacherSupervisedCompletionWorkDataSSRService } from "@unidash/services/teacherSupervisedCompletionWorkData/teacherSupervisedCompletionWorkData.ssr.service";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListTeacherSupervisedCompletionWorkDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllTeacherSupervisedCompletionWorkDataParams>;
}

export default async function ListTeacherSupervisedCompletionWorkDataPage({
  params,
  searchParams,
}: ListTeacherSupervisedCompletionWorkDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const teacherSupervisedCompletionWorkDataResponse =
    await TeacherSupervisedCompletionWorkDataSSRService.getAll(
      courseId,
      {
        itemsPerPage: environment.ITEMS_PER_PAGE,
        page: searchParamsResult?.page,
      },
      {
        semester: searchParamsResult?.semester,
        year: searchParamsResult?.year,
      }
    );

  return (
    <>
      <Toolbar
        breadcrumbPage="Indicadores de orientações de trabalhos de conclusão de curso"
        addLink={{
          link: APP_ROUTES.private.registerTeacherSupervisedCompletionWorkData,
          label: "Novo registro de orientações de TCCs",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <TeacherSupervisedCompletionWorkDataTable
          teacherSupervisedCompletionWorkData={
            teacherSupervisedCompletionWorkDataResponse.teacherSupervisedCompletionWorkData
          }
        />
        <TablePagination
          totalPages={teacherSupervisedCompletionWorkDataResponse.totalPages}
        />
      </Suspense>
    </>
  );
}
