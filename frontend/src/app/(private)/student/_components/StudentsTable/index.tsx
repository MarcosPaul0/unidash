import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { StudentTableProps } from "./studentTable.interface";
import { Formatter } from "@unidash/utils/formatter.util";
import { StudentType } from "../StudentType";
import { StudentActions } from "../StudentActions";
import { Avatar, AvatarFallback } from "@unidash/components/Avatar";

export function StudentsTable({ students }: StudentTableProps) {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

        <TableHeader>
          <TableRow>
            <TableHead />

            <TableHead className="w-[100px]">Nome</TableHead>

            <TableHead>E-mail</TableHead>

            <TableHead>Matrícula</TableHead>

            <TableHead>Tipo</TableHead>

            <TableHead>Registro</TableHead>

            <TableHead className="w-[200px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    {Formatter.getInitials(student.name)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell className="font-medium">{student.name}</TableCell>

              <TableCell>{student.email}</TableCell>

              <TableCell>{student.matriculation}</TableCell>

              <TableCell>
                <StudentType type={student.type} />
              </TableCell>

              <TableCell>{Formatter.registerDate(student.createdAt)}</TableCell>

              <TableCell className="w-[200px] text-center">
                <StudentActions studentId={student.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
