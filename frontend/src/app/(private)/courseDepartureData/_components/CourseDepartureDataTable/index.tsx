import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseDepartureDataTableProps } from "./courseDepartureDataTable.interface";
import { CourseDepartureDataActions } from "../CourseDepartureDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseDepartureDataTable({
  courseDepartureData,
}: CourseDepartureDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Completos</TableHead>

          <TableHead>Expirações</TableHead>

          <TableHead>Vestibular</TableHead>

          <TableHead>Removidos</TableHead>

          <TableHead>Transferências</TableHead>

          <TableHead>Desistências</TableHead>

          <TableHead>Abandonos</TableHead>

          <TableHead>Falecimentos</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseDepartureData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.completed}</TableCell>

            <TableCell>{data.maximumDuration}</TableCell>

            <TableCell>{data.newExams}</TableCell>

            <TableCell>{data.removals}</TableCell>

            <TableCell>{data.transfers}</TableCell>

            <TableCell>{data.withdrawals}</TableCell>

            <TableCell>{data.dropouts}</TableCell>

            <TableCell>{data.deaths}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseDepartureDataActions courseDepartureDataId={data.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
