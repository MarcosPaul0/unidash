import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { TeacherSupervisedCompletionWorkDataTableProps } from "./teacherSupervisedCompletionWorkDataTable.interface";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";
import { TeacherSupervisedCompletionWorkDataActions } from "../TeacherSupervisedCompletionWorkDataActions";
import { Can } from "@unidash/components/Can";

export function TeacherSupervisedCompletionWorkDataTable({
  teacherSupervisedCompletionWorkData,
}: TeacherSupervisedCompletionWorkDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <Can
            allowedRoles={["teacher", "admin"]}
            allowedTeacherRoles={["workCompletionManagerTeacher"]}
          >
            <TableHead>Docente</TableHead>
          </Can>

          <TableHead>Defesas aprovadas</TableHead>

          <TableHead>Defesas reprovadas</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teacherSupervisedCompletionWorkData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <Can
              allowedRoles={["teacher", "admin"]}
              allowedTeacherRoles={["workCompletionManagerTeacher"]}
            >
              <TableCell>{data.teacherName}</TableCell>
            </Can>

            <TableCell>{data.approved}</TableCell>

            <TableCell>{data.failed}</TableCell>

            <TableCell className="w-[100px] text-center">
              <TeacherSupervisedCompletionWorkDataActions
                teacherSupervisedCompletionWorkDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
