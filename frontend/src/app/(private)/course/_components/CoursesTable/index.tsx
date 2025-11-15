import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CoursesTableProps } from "./coursesTable.interface";
import { CourseActions } from "../CourseActions";
import { Formatter } from "@unidash/utils/formatter.util";

export function CoursesTable({ courses }: CoursesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Curso</TableHead>

          <TableHead>Registro</TableHead>

          <TableHead className="w-[200px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.name}</TableCell>

            <TableCell>{Formatter.registerDate(course.createdAt)}</TableCell>

            <TableCell className="w-[200px] text-center">
              <CourseActions courseId={course.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
