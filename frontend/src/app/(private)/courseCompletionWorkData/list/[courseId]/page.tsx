import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCompletionWorkDataSSRService } from "@unidash/services/courseCompletionWorkData/courseCompletionWorkData.ssr.service";
import { GetAllCourseCompletionWorkDataParams } from "@unidash/services/courseCompletionWorkData/courseCompletionWorkDataParams.builder";
import { CourseCompletionWorkDataTable } from "../../_components/CourseCompletionWorkDataTable";
import { IndicatorsFilterForm } from "@unidash/app/(private)/_components/IndicatorsFilterForm";
import { environment } from "@unidash/config/environment.config";

interface ListCourseCompletionWorkDataPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<GetAllCourseCompletionWorkDataParams>;
}

export default async function ListCourseCompletionWorkDataPage({
  params,
  searchParams,
}: ListCourseCompletionWorkDataPageProps) {
  const { courseId } = await params;
  const searchParamsResult = await searchParams;

  const courseCompletionWorkDataResponse =
    await CourseCompletionWorkDataSSRService.getAll(
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
        breadcrumbPage="Dados de TCCs do curso"
        addLink={{
          link: APP_ROUTES.private.registerCourseCompletionWorkData,
          label: "Novo registro de TCCs",
        }}
        filterForm={<IndicatorsFilterForm />}
      />

      <CourseCompletionWorkDataTable
        courseCompletionWorkData={
          courseCompletionWorkDataResponse.courseCompletionWorkData
        }
      />
    </>
  );
}
