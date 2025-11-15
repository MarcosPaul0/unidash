import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseInternshipDataSSRService } from "@unidash/services/courseInternshipData/courseInternshipData.ssr.service";
import { GetAllCourseInternshipDataParams } from "@unidash/services/courseInternshipData/courseInternshipDataParams.builder";
import { CourseInternshipDataTable } from "../../_components/CourseInternshipDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseInternshipDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseInternshipDataParams>;
}

export default async function ListCourseInternshipDataPage({
  params,
  searchParams,
}: ListCourseInternshipDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseInternshipDataResponse =
    await CourseInternshipDataSSRService.getAll(
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
        breadcrumbPage="Dados de estágios do curso"
        addLink={{
          link: `${APP_ROUTES.private.registerCourseInternshipData}${courseId}`,
          label: "Novo registro de estágio",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseInternshipDataTable
          courseInternshipData={
            courseInternshipDataResponse.courseInternshipData
          }
        />
        <TablePagination totalPages={courseInternshipDataResponse.totalPages} />
      </Suspense>
    </>
  );
}
