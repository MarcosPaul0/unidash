import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseCompletionWorkDataTableProps } from "./courseCompletionWorkDataTable.interface";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";
import { CourseCompletionWorkDataActions } from "../CourseCompletionWorkDataActions";

export function CourseCompletionWorkDataTable({
  courseCompletionWorkData,
}: CourseCompletionWorkDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Matrículas</TableHead>

          <TableHead>Defesas</TableHead>

          <TableHead>Abandonos</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseCompletionWorkData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.enrollments}</TableCell>

            <TableCell>{data.defenses}</TableCell>

            <TableCell>{data.abandonments}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseCompletionWorkDataActions
                courseCompletionWorkDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
