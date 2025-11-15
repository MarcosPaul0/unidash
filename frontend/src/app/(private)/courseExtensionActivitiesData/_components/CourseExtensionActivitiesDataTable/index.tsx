import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseExtensionActivitiesDataTableProps } from "./courseExtensionActivitiesDataTable.interface";
import { CourseExtensionActivitiesDataActions } from "../CourseExtensionActivitiesDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseExtensionActivitiesDataTable({
  courseExtensionActivitiesData,
}: CourseExtensionActivitiesDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Proj. especiais</TableHead>

          <TableHead>Competições</TableHead>

          <TableHead>Epreendedorismo</TableHead>

          <TableHead>Eventos</TableHead>

          <TableHead>Proj. culturais</TableHead>

          <TableHead>Proj. universidade</TableHead>

          <TableHead>Estágio externo</TableHead>

          <TableHead>Atuação em ONG</TableHead>

          <TableHead>Empr. juniores</TableHead>

          <TableHead>Serviços autônomo</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseExtensionActivitiesData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.specialProjects}</TableCell>

            <TableCell>{data.participationInCompetitions}</TableCell>

            <TableCell>{data.entrepreneurshipAndInnovation}</TableCell>

            <TableCell>{data.eventOrganization}</TableCell>

            <TableCell>{data.cultureAndExtensionProjects}</TableCell>

            <TableCell>{data.semiannualProjects}</TableCell>

            <TableCell>{data.externalInternship}</TableCell>

            <TableCell>{data.workNonGovernmentalOrganization}</TableCell>

            <TableCell>{data.juniorCompanies}</TableCell>

            <TableCell>
              {data.provisionOfServicesWithSelfEmployedWorkers}
            </TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseExtensionActivitiesDataActions
                courseExtensionActivitiesDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
