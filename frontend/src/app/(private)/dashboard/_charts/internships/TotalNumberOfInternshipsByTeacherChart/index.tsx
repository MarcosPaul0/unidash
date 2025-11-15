"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "@unidash/app/(private)/dashboard/_components/ChartCard";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { TotalNumberOfInternshipsByTeacherChartProps } from "./totalNumberOfInternshipsByTeacherChart.interface";
import { InternshipByAdvisor } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";

const chartConfig = {
  count: {
    label: "Orientações realizadas",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export function TotalNumberOfInternshipsByTeacherChart({
  internshipsByAdvisor,
}: TotalNumberOfInternshipsByTeacherChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<InternshipByAdvisor[]>({
    indicators: internshipsByAdvisor,
    initialData: [],
  });

  return (
    <ChartCard
      title="Número de orientações de estágio supervisionado por professor por ano"
      description="Fonte dos dados: registros institucionais da coordenação de estágios do curso"
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
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          margin={{
            top: 32,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="advisor"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            angle={-45}
            height={50}
            fontSize={14}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar dataKey="count" fill="var(--color-count)" radius={8}>
            <LabelList
              dataKey="count"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
