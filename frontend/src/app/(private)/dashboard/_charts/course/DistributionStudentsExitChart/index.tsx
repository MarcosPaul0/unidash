"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  XAxisTick,
} from "@unidash/components/Chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import { ChartSelect } from "../../../_components/ChartSelect";
import { DistributionStudentsExitChartProps } from "./distributionStudentsExitChart.interface";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { SemestersIndicators } from "@unidash/api/responses/indicators.response";
import { Formatter } from "@unidash/utils/formatter.util";

const typeLabels: Record<string, string> = {
  completed: "Concluído",
  maximumDuration: "Prazo máximo",
  dropouts: "Abandonos",
  transfers: "Transferência outra IES",
  withdrawals: "Desistências",
  removals: "Excluídos",
  newExams: "Novo vestibular",
  deaths: "Falecimento",
};

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
    color: "var(--chart-6)",
  },
  secondSemester: {
    label: "Segundo semestre",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function DistributionStudentsExitChart({
  departures,
}: DistributionStudentsExitChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<SemestersIndicators>({
    indicators: departures,
    initialData: {
      hasDataInFirstSemester: false,
      hasDataInSecondSemester: false,
      data: [],
    },
  });

  return (
    <ChartCard
      title="Número de alunos por tipo de saída, por semestre por ano"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      complement={
        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      }
    >
      <ChartContainer
        config={chartConfig}
        className="min-h-[440px] max-h-[440px] w-full"
      >
        <BarChart accessibilityLayer data={indicatorsData.data}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="type"
            interval={0}
            tickLine={false}
            tickMargin={40}
            axisLine={false}
            height={100}
            tick={(props) => (
              <XAxisTick
                formatter={(value) =>
                  Formatter.getChartLabel(value, typeLabels)
                }
                x={props.x}
                y={props.y}
                payload={props.payload}
                width={120}
              />
            )}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          {indicatorsData.hasDataInFirstSemester && (
            <Bar
              dataKey="firstSemester"
              fill="var(--color-firstSemester)"
              radius={[8, 8, 8, 8]}
              height={440}
            >
              <LabelList
                dataKey="firstSemester"
                position="inside"
                accumulate="none"
                offset={12}
                className="fill-foreground text-sm md:text-lg"
                fontWeight={600}
              />
            </Bar>
          )}

          {indicatorsData.hasDataInSecondSemester && (
            <Bar
              dataKey="secondSemester"
              fill="var(--color-secondSemester)"
              radius={[8, 8, 8, 8]}
              height={440}
            >
              <LabelList
                dataKey="secondSemester"
                position="inside"
                accumulate="none"
                offset={12}
                className="fill-foreground text-sm md:text-lg"
                fontWeight={600}
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
