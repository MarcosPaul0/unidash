/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@unidash/components/Table";
import { ExtensionActivitiesTableProps } from "./extensionActivitiesTable.interface";
import { useActivitiesTable } from "@unidash/hooks/useActivitiesTable";
import { EXTENSION_ACTIVITIES_LABELS } from "../RegistrationByTypeOfExtensionActivity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";

export function ExtensionActivitiesTable({
  extensionActivities,
}: ExtensionActivitiesTableProps) {
  const { activities, activitiesByYear } = useActivitiesTable({
    data: extensionActivities,
    labels: EXTENSION_ACTIVITIES_LABELS,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Atividades de extensão por tipo de atividade por ano
        </CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">Atividade</TableHead>

              {activities.map(([year]) => (
                <TableHead className="py-5" key={year}>
                  {year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {activitiesByYear.map((activity) => (
              <TableRow key={activity.activity}>
                <TableCell className="py-6">{activity.activity}</TableCell>

                {activity.activitiesByYear.map((yearActivities, index) => (
                  <TableCell
                    className="py-6"
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
