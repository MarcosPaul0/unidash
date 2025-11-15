import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseRegistrationLockDataTableProps } from "./courseRegistrationLockDataTable.interface";
import { CourseRegistrationLockDataActions } from "../CourseRegistrationLockDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseRegistrationLockDataTable({
  courseRegistrationLockData,
}: CourseRegistrationLockDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Dificuldades na disciplina</TableHead>

          <TableHead>Incompat. com trabalho</TableHead>

          <TableHead>Perda de interesse</TableHead>

          <TableHead>Metodologia do professor</TableHead>

          <TableHead>Carga horária</TableHead>

          <TableHead>Outros</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseRegistrationLockData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.difficultyInDiscipline}</TableCell>

            <TableCell>{data.incompatibilityWithWork}</TableCell>

            <TableCell>{data.lossOfInterest}</TableCell>

            <TableCell>{data.teacherMethodology}</TableCell>

            <TableCell>{data.workload}</TableCell>

            <TableCell>{data.other}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseRegistrationLockDataActions
                courseRegistrationLockDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
