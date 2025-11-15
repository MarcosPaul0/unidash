import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseDepartureDataSSRService } from "@unidash/services/courseDepartureData/courseDepartureData.ssr.service";
import { EditCourseDepartureDataForm } from "../../_components/EditCourseDepartureDataForm";

interface EditCourseDeparturePageProps {
  params: Promise<{ courseDepartureDataId: string }>;
}

export default async function EditCourseDeparturePage({
  params,
}: EditCourseDeparturePageProps) {
  const { courseDepartureDataId } = await params;

  const { courseDepartureData } = await CourseDepartureDataSSRService.getById(
    courseDepartureDataId
  );

  return (
    <>
      <Toolbar
        breadcrumbPage="Editar registro de saídas do curso"
        breadcrumbItems={[
          {
            label: "Dados de saídas do cuso",
            link: APP_ROUTES.private.courseDepartureData,
            fromCourse: true,
          },
        ]}
      />

      <EditCourseDepartureDataForm courseDepartureData={courseDepartureData} />
    </>
  );
}
