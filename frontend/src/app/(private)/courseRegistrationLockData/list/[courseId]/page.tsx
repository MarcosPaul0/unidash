import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseRegistrationLockDataSSRService } from "@unidash/services/courseRegistrationLockData/courseRegistrationLockData.ssr.service";
import { GetAllCourseRegistrationLockDataParams } from "@unidash/services/courseRegistrationLockData/courseRegistrationLockDataParams.builder";
import { CourseRegistrationLockDataTable } from "../../_components/CourseRegistrationLockDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { Suspense } from "react";
import { TablePagination } from "@unidash/app/(private)/_components/TablePagination";

interface ListCourseRegistrationLockDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseRegistrationLockDataParams>;
}

export default async function ListCourseRegistrationLockDataPage({
  params,
  searchParams,
}: ListCourseRegistrationLockDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseRegistrationLockDataResponse =
    await CourseRegistrationLockDataSSRService.getAll(
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
        breadcrumbPage="Dados de trancamentos do curso"
        addLink={{
          link: APP_ROUTES.private.registerCourseRegistrationLockData,
          label: "Novo registro de trancamentos",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <CourseRegistrationLockDataTable
          courseRegistrationLockData={
            courseRegistrationLockDataResponse.courseRegistrationLockData
          }
        />
        <TablePagination
          totalPages={courseRegistrationLockDataResponse.totalPages}
        />
      </Suspense>
    </>
  );
}
