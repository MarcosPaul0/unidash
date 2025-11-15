import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseExtensionComplementaryActivitiesDataTableProps } from "./courseExtensionComplementaryActivitiesDataTable.interface";
import { CourseExtensionComplementaryActivitiesDataActions } from "../CourseExtensionComplementaryActivitiesDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseExtensionComplementaryActivitiesDataTable({
  courseExtensionComplementaryActivitiesData,
}: CourseExtensionComplementaryActivitiesDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Atv. culturais</TableHead>

          <TableHead>Compet. esportivas</TableHead>

          <TableHead>Premiações</TableHead>

          <TableHead>Repre. estudantil</TableHead>

          <TableHead>Órgãos colegiados</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseExtensionComplementaryActivitiesData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.culturalActivities}</TableCell>

            <TableCell>{data.sportsCompetitions}</TableCell>

            <TableCell>{data.awardsAtEvents}</TableCell>

            <TableCell>{data.studentRepresentation}</TableCell>

            <TableCell>{data.participationInCollegiateBodies}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseExtensionComplementaryActivitiesDataActions
                courseExtensionComplementaryActivitiesDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
