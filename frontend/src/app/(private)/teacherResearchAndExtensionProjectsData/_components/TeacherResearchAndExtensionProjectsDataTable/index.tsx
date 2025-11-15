import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { TeacherResearchAndExtensionProjectsDataTableProps } from "./teacherResearchAndExtensionProjectsDataTable.interface";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";
import { TeacherResearchAndExtensionProjectsDataActions } from "../TeacherResearchAndExtensionProjectsDataActions";
import { Can } from "@unidash/components/Can";

export function TeacherResearchAndExtensionProjectsDataTable({
  teacherResearchAndExtensionProjectsData,
}: TeacherResearchAndExtensionProjectsDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <Can
            allowedRoles={["teacher", "admin"]}
            allowedTeacherRoles={["courseManagerTeacher"]}
          >
            <TableHead>Docente</TableHead>
          </Can>

          <TableHead>Projetos de extensão</TableHead>

          <TableHead>Projetos de pesquisa</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teacherResearchAndExtensionProjectsData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <Can
              allowedRoles={["teacher", "admin"]}
              allowedTeacherRoles={["courseManagerTeacher"]}
            >
              <TableCell>{data.teacherName}</TableCell>
            </Can>

            <TableCell>{data.extensionProjects}</TableCell>

            <TableCell>{data.researchProjects}</TableCell>

            <TableCell className="w-[100px] text-center">
              <TeacherResearchAndExtensionProjectsDataActions
                teacherResearchAndExtensionProjectsDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
