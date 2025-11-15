import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseCoordinationDataTableProps } from "./courseCoordinationDataTable.interface";
import { CourseCoordinationDataActions } from "../CourseCoordinationDataActions";
import { SemesterTag } from "../SemesterTag";

export function CourseCoordinationDataTable({
  courseCoordinationData,
}: CourseCoordinationDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Ações administrativas</TableHead>

          <TableHead>Resoluções</TableHead>

          <TableHead>Atend. por e-mail</TableHead>

          <TableHead>Atend. pelo SIGAA</TableHead>

          <TableHead>Reun. conselho diretor</TableHead>

          <TableHead>Reun. colegiado de curso</TableHead>

          <TableHead>Reun. câmara de graduação</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseCoordinationData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.administrativeDecisionActions}</TableCell>

            <TableCell>{data.resolutionActions}</TableCell>

            <TableCell>{data.servicesRequestsByEmail}</TableCell>

            <TableCell>{data.servicesRequestsBySystem}</TableCell>

            <TableCell>{data.meetingsByBoardOfDirectors}</TableCell>

            <TableCell>{data.meetingsByCourseCouncil}</TableCell>

            <TableCell>{data.meetingsByUndergraduateChamber}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseCoordinationDataActions
                courseCoordinationDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
