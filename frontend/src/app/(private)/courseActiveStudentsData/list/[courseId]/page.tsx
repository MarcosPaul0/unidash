import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseActiveStudentsDataTable } from "../../_components/CourseActiveStudentsDataTable";
import { CourseActiveStudentsDataSSRService } from "@unidash/services/courseActiveStudentsData/courseActiveStudentsData.ssr.service";
import { GetAllCourseActiveStudentsDataParams } from "@unidash/services/courseActiveStudentsData/courseActiveStudentsDataParams.builder";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseActiveStudentsDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseActiveStudentsDataParams>;
}

export default async function ListCourseActiveStudentsDataPage({
  params,
  searchParams,
}: ListCourseActiveStudentsDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseActiveStudentsDataResponse =
    await CourseActiveStudentsDataSSRService.getAll(
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
        addLink={{
          link: APP_ROUTES.private.registerCourseActiveStudentsData,
          label: "Novo registro de alunos ativos",
        }}
        breadcrumbPage="Dados de alunos ativos do curso"
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseActiveStudentsDataTable
          courseActiveStudentsData={
            courseActiveStudentsDataResponse.courseActiveStudentsData
          }
        />
        <TablePagination
          totalPages={courseActiveStudentsDataResponse.totalPages}
        />
      </Suspense>
    </>
  );
}
