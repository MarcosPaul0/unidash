/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { ExtensionComplementaryActivitiesTableProps } from "./extensionComplementaryActivitiesTable.interface";
import { useActivitiesTable } from "@unidash/hooks/useActivitiesTable";
import { EXTENSION_COMPLEMENTARY_ACTIVITIES_LABELS } from "../RegistrationByTypeOfExtensionComplementaryActivity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";

export function ExtensionComplementaryActivitiesTable({
  extensionComplementaryActivities,
}: ExtensionComplementaryActivitiesTableProps) {
  const { activities, activitiesByYear } = useActivitiesTable({
    data: extensionComplementaryActivities,
    labels: EXTENSION_COMPLEMENTARY_ACTIVITIES_LABELS,
  });

  console.log({ activities, activitiesByYear });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Atividades complementares na dimenção extensão por tipo de atividade
          por ano
        </CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="py-5 px-4">Atividade</TableHead>

              {activities.map(([year]) => (
                <TableHead className="py-5 px-4" key={year}>
                  {year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {activitiesByYear.map((activity) => (
              <TableRow key={activity.activity}>
                <TableCell className="py-6 px-4">{activity.activity}</TableCell>

                {activity.activitiesByYear.map((yearActivities, index) => (
                  <TableCell
                    className="py-6 px-4"
                    key={`${yearActivities}-${index}`}
                  >
                    {yearActivities}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell className="py-6 px-4 font-bold">Total</TableCell>

              {activities.map(([_, yearActivities], index) => (
                <TableCell
                  className="py-6 px-4 font-bold"
                  key={`${yearActivities}-${index}`}
                >
                  {yearActivities.total}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </table>
      </CardContent>
    </Card>
  );
}
