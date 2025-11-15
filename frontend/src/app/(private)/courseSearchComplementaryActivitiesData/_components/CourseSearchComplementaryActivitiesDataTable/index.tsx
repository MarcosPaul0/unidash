import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { CourseSearchComplementaryActivitiesDataTableProps } from "./courseSearchComplementaryActivitiesDataTable.interface";
import { CourseSearchComplementaryActivitiesDataActions } from "../CourseSearchComplementaryActivitiesDataActions";
import { SemesterTag } from "@unidash/app/(private)/courseCoordinationData/_components/SemesterTag";

export function CourseSearchComplementaryActivitiesDataTable({
  courseSearchComplementaryActivitiesData,
}: CourseSearchComplementaryActivitiesDataTableProps) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

      <TableHeader>
        <TableRow>
          <TableHead>Ano</TableHead>

          <TableHead>Semestre</TableHead>

          <TableHead>Inic. científica</TableHead>

          <TableHead>Desenv. tecnológico</TableHead>

          <TableHead>Artigos na área</TableHead>

          <TableHead>Artigos em congressos</TableHead>

          <TableHead>Resumos em congressos</TableHead>

          <TableHead>Apres. trabalhos</TableHead>

          <TableHead>Eventos</TableHead>

          <TableHead className="w-[100px] text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {courseSearchComplementaryActivitiesData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.year}</TableCell>

            <TableCell>
              <SemesterTag semester={data.semester} />
            </TableCell>

            <TableCell>{data.scientificInitiation}</TableCell>

            <TableCell>{data.developmentInitiation}</TableCell>

            <TableCell>{data.fullPublishedArticles}</TableCell>

            <TableCell>{data.publishedArticles}</TableCell>

            <TableCell>{data.publishedAbstracts}</TableCell>

            <TableCell>{data.presentationOfWork}</TableCell>

            <TableCell>{data.participationInEvents}</TableCell>

            <TableCell className="w-[100px] text-center">
              <CourseSearchComplementaryActivitiesDataActions
                courseSearchComplementaryActivitiesDataId={data.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
