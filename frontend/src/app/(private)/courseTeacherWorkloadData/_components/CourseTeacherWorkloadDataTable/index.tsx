import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseTeacherWorkloadDataTableProps } from "./courseTeacherWorkloadDataTable.interface";
import { CourseTeacherWorkloadDataActions } from "../CourseTeacherWorkloadDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseTeacherWorkloadDataTable({
  courseTeacherWorkloadData,
}: CourseTeacherWorkloadDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Docente</TableHead>

          <TableHead>Carga horária</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseTeacherWorkloadData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.teacherName}</TableCell>

            <TableCell>{data.workloadInHours} horas</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseTeacherWorkloadDataActions
                courseTeacherWorkloadDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
