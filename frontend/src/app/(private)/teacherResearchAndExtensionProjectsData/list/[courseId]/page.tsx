import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { GetAllTeacherResearchAndExtensionProjectsDataParams } from "@unidash/services/teacherResearchAndExtensionProjectsData/teacherResearchAndExtensionProjectsDataParams.builder";
import { TeacherResearchAndExtensionProjectsDataSSRService } from "@unidash/services/teacherResearchAndExtensionProjectsData/teacherResearchAndExtensionProjectsData.ssr.service";
import { TeacherResearchAndExtensionProjectsDataTable } from "../../_components/TeacherResearchAndExtensionProjectsDataTable";
import { environment } from "@unidash/config/environment.config";

interface ListTeacherResearchAndExtensionProjectsDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllTeacherResearchAndExtensionProjectsDataParams>;
}

export default async function ListTeacherResearchAndExtensionProjectsDataPage({
  params,
  searchParams,
}: ListTeacherResearchAndExtensionProjectsDataPageProps) {
  const { courseId } = await params;

  const searchParamsResult = await searchParams;

  const teacherResearchAndExtensionProjectsDataResponse =
    await TeacherResearchAndExtensionProjectsDataSSRService.getAll(
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
        breadcrumbPage="Indicadores de projetos de pesquisa e extensão"
        addLink={{
          link: APP_ROUTES.private
            .registerTeacherResearchAndExtensionProjectsData,
          label: "Novo registro de projetos de pesquisa e extensão",
        }}
      />

      <TeacherResearchAndExtensionProjectsDataTable
        teacherResearchAndExtensionProjectsData={
          teacherResearchAndExtensionProjectsDataResponse.teacherResearchAndExtensionProjectsData
        }
      />
    </>
  );
}
