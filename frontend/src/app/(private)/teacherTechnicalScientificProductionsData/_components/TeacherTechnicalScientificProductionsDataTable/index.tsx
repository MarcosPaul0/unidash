import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { TeacherTechnicalScientificProductionsDataTableProps } from "./teacherTechnicalScientificProductionsDataTable.interface";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";
import { TeacherTechnicalScientificProductionsDataActions } from "../TeacherTechnicalScientificProductionsDataActions";
import { Can } from "@unidash/components/Can";

export function TeacherTechnicalScientificProductionsDataTable({
  teacherTechnicalScientificProductionsData,
}: TeacherTechnicalScientificProductionsDataTableProps) {
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

          <TableHead>Periódicos</TableHead>

          <TableHead>Congressos</TableHead>

          <TableHead>Resumos</TableHead>

          <TableHead>Capítulos de livros</TableHead>

          <TableHead>Programas</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teacherTechnicalScientificProductionsData.map((data) => (
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

            <TableCell>{data.periodicals}</TableCell>

            <TableCell>{data.congress}</TableCell>

            <TableCell>{data.abstracts}</TableCell>

            <TableCell>{data.booksChapter}</TableCell>

            <TableCell>{data.programs}</TableCell>

            <TableCell className="w-[100px] text-center">
              <TeacherTechnicalScientificProductionsDataActions
                teacherTechnicalScientificProductionsDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
