import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseExtensionActivitiesDataSSRService } from "@unidash/services/courseExtensionActivitiesData/courseExtensionActivitiesData.ssr.service";
import { GetAllCourseExtensionActivitiesDataParams } from "@unidash/services/courseExtensionActivitiesData/courseExtensionActivitiesDataParams.builder";
import { CourseExtensionActivitiesDataTable } from "../../_components/CourseExtensionActivitiesDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseExtensionActivitiesDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseExtensionActivitiesDataParams>;
}

export default async function ListCourseExtensionActivitiesDataPage({
  params,
  searchParams,
}: ListCourseExtensionActivitiesDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseExtensionActivitiesDataResponse =
    await CourseExtensionActivitiesDataSSRService.getAll(
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
        breadcrumbPage="Dados de atividades de extensão do curso"
        addLink={{
          link: APP_ROUTES.private.registerCourseExtensionActivitiesData,
          label: "Novo registro de atividades de extensão",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseExtensionActivitiesDataTable
          courseExtensionActivitiesData={
            courseExtensionActivitiesDataResponse.courseExtensionActivitiesData
          }
        />
        <TablePagination
          totalPages={courseExtensionActivitiesDataResponse.totalPages}
        />
      </Suspense>
    </>
  );
}
