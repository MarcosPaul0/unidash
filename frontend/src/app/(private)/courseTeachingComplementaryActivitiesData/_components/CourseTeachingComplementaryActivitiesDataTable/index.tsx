import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseTeachingComplementaryActivitiesDataTableProps } from "./courseTeachingComplementaryActivitiesDataTable.interface";
import { CourseTeachingComplementaryActivitiesDataActions } from "../CourseTeachingComplementaryActivitiesDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseTeachingComplementaryActivitiesDataTable({
  courseTeachingComplementaryActivitiesData,
}: CourseTeachingComplementaryActivitiesDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Disciplinas eletivas</TableHead>

          <TableHead>Prep. ENADE</TableHead>

          <TableHead>Monitoria</TableHead>

          <TableHead>Apadrinhamento</TableHead>

          <TableHead>Cursos na área</TableHead>

          <TableHead>Cursos complementares</TableHead>

          <TableHead>Cursos não relacionados</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseTeachingComplementaryActivitiesData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.electivesDisciplines}</TableCell>

            <TableCell>{data.preparationForTest}</TableCell>

            <TableCell>{data.subjectMonitoring}</TableCell>

            <TableCell>{data.sponsorshipOfNewStudents}</TableCell>

            <TableCell>{data.coursesInTheArea}</TableCell>

            <TableCell>{data.complementaryCoursesInTheArea}</TableCell>

            <TableCell>{data.coursesOutsideTheArea}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseTeachingComplementaryActivitiesDataActions
                courseTeachingComplementaryActivitiesDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
