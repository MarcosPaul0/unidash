"use client";

import { DistributionOfTimeSpentCompletingInternshipCardProps } from "./distributionOfTimeSpentCompletingInternshipChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { InternshipByConclusionTime } from "@unidash/api/responses/indicators.response";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import {
  CalendarCheckIcon,
  CalendarMinusIcon,
  CalendarPlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ConclusionTimeItem } from "../ConclusionTimeItem";

export function DistributionOfTimeSpentCompletingInternshipCard({
  internshipsByConclusionTime,
}: DistributionOfTimeSpentCompletingInternshipCardProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<InternshipByConclusionTime>({
    indicators: internshipsByConclusionTime,
    initialData: {
      averageTimeInDays: 0,
      maxTimeInDays: 0,
      minTimeInDays: 0,
    },
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="mr-28">
          Número de alunos, por tempo gasto em dias, para conclusão de estágio
          supervisionado
        </CardTitle>

        <CardDescription>
          Fonte dos dados: registros institucionais da coordenação de estágios
          do curso.
        </CardDescription>

        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      </CardHeader>

      <CardContent className="flex flex-col justify-between gap-4 h-full">
        <ConclusionTimeItem
          icon={<CalendarCheckIcon />}
          title="Tempo médio para a conclusão do estágio supervisionado no ano"
          value={indicatorsData.averageTimeInDays}
        />
        <ConclusionTimeItem
          icon={<CalendarPlusIcon />}
          color="red"
          title=" Maior tempo registrado para a conclusão do estágio no ano"
          value={indicatorsData.maxTimeInDays}
        />
        <ConclusionTimeItem
          icon={<CalendarMinusIcon />}
          color="green"
          title="Menor tempo registrado para a conclusão do estágio no ano"
          value={indicatorsData.minTimeInDays}
        />
      </CardContent>
    </Card>
  );
}
