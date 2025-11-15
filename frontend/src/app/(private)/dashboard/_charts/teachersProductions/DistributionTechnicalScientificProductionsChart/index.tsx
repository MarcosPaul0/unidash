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
import { DistributionTechnicalScientificProductionsChartProps } from "./distributionTechnicalScientificProductionsChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ProductionByType } from "@unidash/api/responses/indicators.response";
import { Formatter } from "@unidash/utils/formatter.util";

const productionsLabels: Record<string, string> = {
  periodicals: "Periódicos",
  congress: "Congressos",
  booksChapter: "Capítulo de livros",
  programs: "Programas",
  abstracts: "Resumos",
};

const chartConfig = {
  count: {
    label: "Produções técnico-científicas registradas",
    color: "var(--chart-8)",
  },
} satisfies ChartConfig;

export function DistributionTechnicalScientificProductionsChart({
  technicalScientificProductionsByType,
}: DistributionTechnicalScientificProductionsChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ProductionByType[]>({
    indicators: technicalScientificProductionsByType,
    initialData: [],
  });

  return (
    <ChartCard
      title="Distribuição de produções técnico-científicas por tipo"
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
            dataKey="type"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            fontSize={14}
            height={50}
            tickFormatter={(value) =>
              Formatter.getChartLabel(value, productionsLabels)
            }
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
