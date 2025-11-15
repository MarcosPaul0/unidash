import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseStudentsDataTable } from "../../_components/CourseStudentsDataTable";
import { CourseStudentsDataSSRService } from "@unidash/services/courseStudentsData/courseStudentsData.ssr.service";
import { GetAllCourseStudentsDataParams } from "@unidash/services/courseStudentsData/courseStudentsDataParams.builder";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseStudentsDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseStudentsDataParams>;
}

export default async function ListCourseStudentsDataPage({
  params,
  searchParams,
}: ListCourseStudentsDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseStudentsDataResponse = await CourseStudentsDataSSRService.getAll(
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
          link: APP_ROUTES.private.registerCourseStudentsData,
          label: "Novo registro de alunos",
        }}
        breadcrumbPage="Dados de alunos do cuso"
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseStudentsDataTable
          courseStudentsData={courseStudentsDataResponse.courseStudentsData}
        />
        <TablePagination totalPages={courseStudentsDataResponse.totalPages} />
      </Suspense>
    </>
  );
}
