import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { TeacherTechnicalScientificProductionsDataTable } from "../_components/TeacherTechnicalScientificProductionsDataTable";
import { GetAllTeacherTechnicalScientificProductionsDataParams } from "@unidash/services/teacherTechnicalScientificProductionsData/teacherTechnicalScientificProductionsDataParams.builder";
import { TeacherTechnicalScientificProductionsDataSSRService } from "@unidash/services/teacherTechnicalScientificProductionsData/teacherTechnicalScientificProductionsData.ssr.service";
import { IndicatorsFilterForm } from "../../_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";
import { TablePagination } from "../../_components/TablePagination";
import { Suspense } from "react";

interface ListTeacherTechnicalScientificProductionsDataPageProps {
  searchParams: Promise<GetAllTeacherTechnicalScientificProductionsDataParams>;
}

export default async function ListTeacherTechnicalScientificProductionsDataPage({
  searchParams,
}: ListTeacherTechnicalScientificProductionsDataPageProps) {
  const searchParamsResult = await searchParams;

  const teacherTechnicalScientificProductionsDataResponse =
    await TeacherTechnicalScientificProductionsDataSSRService.getAllForTeacher(
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
        breadcrumbPage="Indicadores de produções técnico-científicas"
        addLink={{
          link: APP_ROUTES.private
            .registerTeacherTechnicalScientificProductionsData,
          label: "Novo registro de produções técnico-científicas",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <Suspense fallback="carregando">
        <TeacherTechnicalScientificProductionsDataTable
          teacherTechnicalScientificProductionsData={
            teacherTechnicalScientificProductionsDataResponse.teacherTechnicalScientificProductionsData
          }
        />
        <TablePagination
          totalPages={
            teacherTechnicalScientificProductionsDataResponse.totalPages
          }
        />
      </Suspense>
    </>
  );
}
