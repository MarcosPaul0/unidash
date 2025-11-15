import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { TeachersTableProps } from "./teachersTable.interface";
import { Formatter } from "@unidash/utils/formatter.util";
import { Avatar, AvatarFallback } from "@unidash/components/Avatar";
import { TeacherActions } from "../TeacherActions";
import { TeacherStatus } from "../TeacherStatus";

export function TeachersTable({ teachers }: TeachersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />

          <TableHead className="w-[100px]">Nome</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Registro</TableHead>

          <TableHead className="w-[200px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>
              <Avatar>
                <AvatarFallback>
                  {Formatter.getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
            </TableCell>

            <TableCell className="font-medium">{teacher.name}</TableCell>

            <TableCell>{teacher.email}</TableCell>

            <TableCell>
              <TeacherStatus isActive={teacher.isActive} />
            </TableCell>

            <TableCell>{Formatter.registerDate(teacher.createdAt)}</TableCell>

            <TableCell className="w-[200px] text-center">
              <TeacherActions teacherId={teacher.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
