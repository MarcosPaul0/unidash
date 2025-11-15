import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseInternshipDataTableProps } from "./courseInternshipDataTable.interface";
import { CourseInternshipDataActions } from "../CourseInternshipDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";
import { EmploymentTypeTag } from "../EmploymentTypeTag";

export function CourseInternshipDataTable({
  courseInternshipData,
}: CourseInternshipDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Matrícula</TableHead>

          <TableHead>Orientador</TableHead>

          <TableHead>Cidade</TableHead>

          <TableHead>CNPJ</TableHead>

          <TableHead>Atuação</TableHead>

          <TableHead>Vínculo</TableHead>

          <TableHead>Tempo de conclusão</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseInternshipData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.studentMatriculation}</TableCell>

            <TableCell>{data.advisorName}</TableCell>

            <TableCell>{data.cityName}</TableCell>

            <TableCell>{data.enterpriseCnpj}</TableCell>

            <TableCell>{data.role}</TableCell>

            <TableCell>
              <EmploymentTypeTag employmentType={data.employmentType} />
            </TableCell>

            <TableCell>{data.conclusionTimeInDays} dias</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseInternshipDataActions courseInternshipDataId={data.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
