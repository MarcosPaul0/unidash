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
import { TechnicalScientificProductionsByTypeAndTeacherChartProps } from "./technicalScientificProductionsByTypeAndTeacherChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ProductionByTeacher } from "@unidash/api/responses/indicators.response";

const chartConfig = {
  periodicals: {
    label: "Periódicos",
    color: "var(--chart-12)",
  },
  congress: {
    label: "Congressos",
    color: "var(--chart-13)",
  },
  abstracts: {
    label: "Resumos",
    color: "var(--chart-8)",
  },
  booksChapter: {
    label: "Capítulo de livros",
    color: "var(--chart-6)",
  },
  programs: {
    label: "Softwares",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export function TechnicalScientificProductionsByTypeAndTeacherChart({
  technicalScientificProductionsByTeacher,
}: TechnicalScientificProductionsByTypeAndTeacherChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ProductionByTeacher[]>({
    indicators: technicalScientificProductionsByTeacher,
    initialData: [],
  });

  return (
    <ChartCard
      title="Produções técnico-científicas por tipo e professor"
      description="Fonte dos dados: registros institucionais dos docentes do curso"
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
            dataKey="teacher"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            angle={330}
            fontSize={14}
            height={80}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar
            dataKey="periodicals"
            stackId="a"
            fill="var(--color-periodicals)"
            radius={[0, 0, 8, 8]}
          />

          <Bar dataKey="congress" stackId="a" fill="var(--color-congress)" />

          <Bar dataKey="abstracts" stackId="a" fill="var(--color-abstracts)" />

          <Bar
            dataKey="booksChapter"
            stackId="a"
            fill="var(--color-booksChapter)"
          />

          <Bar
            dataKey="programs"
            stackId="a"
            fill="var(--color-programs)"
            radius={[8, 8, 0, 0]}
          >
            <LabelList
              dataKey="total"
              position="top"
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
