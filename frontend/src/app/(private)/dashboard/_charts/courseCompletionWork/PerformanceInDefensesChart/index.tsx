"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import { PerformanceInDefensesChartProps } from "./performanceInDefensesChart.interface";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { OrientationsByTeacher } from "@unidash/api/responses/indicators.response";
import { ChartSelect } from "../../../_components/ChartSelect";

const chartConfig = {
  approved: {
    label: "Aprovadas",
    color: "var(--chart-1)",
  },
  failed: {
    label: "Pendentes/Desistências",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PerformanceInDefensesChart({
  orientationsByTeacher,
}: PerformanceInDefensesChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<OrientationsByTeacher[]>({
    indicators: orientationsByTeacher,
    initialData: [],
  });

  return (
    <ChartCard
      title="Número de resultados de defesas de TCCs, por docente orientador, por ano"
      description="Fonte dos dados: registros institucionais da coordenação de TCCs do curso"
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
        <BarChart accessibilityLayer data={indicatorsData}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="teacher"
            tickLine={false}
            tickMargin={30}
            axisLine={false}
            height={80}
            fontSize={14}
            angle={-45}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar dataKey="approved" fill="var(--color-approved)" radius={8}>
            <LabelList
              dataKey="approved"
              position="inside"
              accumulate="none"
              offset={12}
              className="fill-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar dataKey="failed" fill="var(--color-failed)" radius={8}>
            <LabelList
              dataKey="failed"
              position="inside"
              accumulate="none"
              offset={12}
              className="fill-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
