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
import { InternshipsByRoleChartProps } from "./internshipsByRoleChart.interface";
import { InternshipByRole } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";

const chartConfig = {
  count: {
    label: "Área de atuação por estágio",
    color: "var(--chart-8)",
  },
} satisfies ChartConfig;

export function InternshipsByRoleChart({
  internshipsByRole,
}: InternshipsByRoleChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<InternshipByRole[]>({
    indicators: internshipsByRole,
    initialData: [],
  });

  return (
    <ChartCard
      title="Número de estágios supervisionados por área de atuação profissional por ano"
      description="Fonte dos dados: registros institucionais da coordenação de estágios do curso"
      complement={
        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      }
    >
      <ChartContainer config={chartConfig} className="min-h-[440px] w-full">
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          margin={{
            top: 32,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="role"
            tickLine={false}
            tickMargin={40}
            axisLine={false}
            height={80}
            fontSize={14}
            angle={-16}
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
