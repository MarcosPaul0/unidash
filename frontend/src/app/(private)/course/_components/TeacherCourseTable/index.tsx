import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { TeacherCoursesSSRService } from "@unidash/services/teacherCourse/teacherCourse.ssr.service";
import { TeacherCourseTableProps } from "./teacherCourseTable.interface";
import { TeacherCourseActions } from "../TeacherCourseActions";
import { TeacherRoleMenu } from "../TeacherRoleMenu";
import { Avatar, AvatarFallback } from "@unidash/components/Avatar";
import { Formatter } from "@unidash/utils/formatter.util";

export async function TeacherCourseTable({
  courseId,
}: TeacherCourseTableProps) {
  const teacherCoursesResponse = await TeacherCoursesSSRService.getAllByCourse(
    courseId
  );

  return (
    <>
      <Table className="p-0 shadow-none">
        <TableHeader>
          <TableRow>
            <TableHead />

            <TableHead className="w-[100px]">Nome</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Registro</TableHead>

            <TableHead>Atuação</TableHead>

            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teacherCoursesResponse.teacherCourses.map((teacherCourse) => (
            <TableRow key={teacherCourse.id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarFallback>
                    {Formatter.getInitials(teacherCourse.name)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell className="font-medium">
                {teacherCourse.name}
              </TableCell>

              <TableCell className="font-medium">
                {teacherCourse.email}
              </TableCell>

              <TableCell>
                {Formatter.registerDate(teacherCourse.createdAt)}
              </TableCell>

              <TableCell>
                <TeacherRoleMenu teacherCourse={teacherCourse} />
              </TableCell>

              <TableCell className="text-right flex justify-center">
                <TeacherCourseActions teacherCourseId={teacherCourse.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
