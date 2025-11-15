import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseStudentsDataTableProps } from "./courseStudentsDataTable.interface";
import { CourseStudentsDataActions } from "../CourseStudentsDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseStudentsDataTable({
  courseStudentsData,
}: CourseStudentsDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Vagas</TableHead>

          <TableHead>Inscritos</TableHead>

          <TableHead>Ingressantes</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseStudentsData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.vacancies}</TableCell>

            <TableCell>{data.subscribers}</TableCell>

            <TableCell>{data.entrants}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseStudentsDataActions courseStudentsDataId={data.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
