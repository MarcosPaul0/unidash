import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseTeacherWorkloadDataSSRService } from "@unidash/services/courseTeacherWorkloadData/courseTeacherWorkloadData.ssr.service";
import { GetAllCourseTeacherWorkloadDataParams } from "@unidash/services/courseTeacherWorkloadData/courseTeacherWorkloadDataParams.builder";
import { CourseTeacherWorkloadDataTable } from "../../_components/CourseTeacherWorkloadDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseTeacherWorkloadDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseTeacherWorkloadDataParams>;
}

export default async function ListCourseTeacherWorkloadDataPage({
  params,
  searchParams,
}: ListCourseTeacherWorkloadDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseTeacherWorkloadDataResponse =
    await CourseTeacherWorkloadDataSSRService.getAll(
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
        breadcrumbPage="Dados de carga horária do docente no curso"
        addLink={{
          link: `${APP_ROUTES.private.registerCourseTeacherWorkloadData}${courseId}`,
          label: "Novo registro de carga horária do docente",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseTeacherWorkloadDataTable
          courseTeacherWorkloadData={
            courseTeacherWorkloadDataResponse.courseTeacherWorkloadData
          }
        />
        <TablePagination
          totalPages={courseTeacherWorkloadDataResponse.totalPages}
        />
      </Suspense>
    </>
  );
}
