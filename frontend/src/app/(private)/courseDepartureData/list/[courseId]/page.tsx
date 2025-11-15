import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseDepartureDataSSRService } from "@unidash/services/courseDepartureData/courseDepartureData.ssr.service";
import { GetAllCourseDepartureDataParams } from "@unidash/services/courseDepartureData/courseDepartureDataParams.builder";
import { CourseDepartureDataTable } from "../../_components/CourseDepartureDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseDepartureDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseDepartureDataParams>;
}

export default async function ListCourseDepartureDataPage({
  params,
  searchParams,
}: ListCourseDepartureDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseDepartureDataResponse =
    await CourseDepartureDataSSRService.getAll(
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
        breadcrumbPage="Dados de saídas do curso"
        addLink={{
          link: APP_ROUTES.private.registerCourseDepartureData,
          label: "Novo registro de saídas",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseDepartureDataTable
          courseDepartureData={courseDepartureDataResponse.courseDepartureData}
        />
        <TablePagination totalPages={courseDepartureDataResponse.totalPages} />
      </Suspense>
    </>
  );
}
