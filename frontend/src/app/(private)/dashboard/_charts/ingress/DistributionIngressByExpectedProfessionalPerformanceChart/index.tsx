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
import { DistributionIngressByExpectedProfessionalPerformanceChartProps } from "./distributionIngressByExpectedProfessionalPerformanceChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingWorkExpectation } from "@unidash/api/responses/indicators.response";
import { Formatter } from "@unidash/utils/formatter.util";
import { WORK_EXPECTATION } from "@unidash/api/dtos/studentIncomingData.dto";

const typeLabels: Record<string, string> = {
  [WORK_EXPECTATION.employmentContract]: "CLT",
  [WORK_EXPECTATION.independentContractor]: "PJ",
  [WORK_EXPECTATION.undecided]: "Indeciso",
  [WORK_EXPECTATION.publicSector]: "Setor público",
  [WORK_EXPECTATION.academicCareer]: "Academia",
};

const chartConfig = {
  count: {
    label: "Expectativa de atuação",
    color: "var(--chart-11)",
  },
} satisfies ChartConfig;

export function DistributionIngressByExpectedProfessionalPerformanceChart({
  studentIncomingByWorkExpectation,
}: DistributionIngressByExpectedProfessionalPerformanceChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingWorkExpectation[]>({
    indicators: studentIncomingByWorkExpectation,
    initialData: [],
  });

  return (
    <ChartCard
      title="Distribuição dos ingressantes por expectativa de atuação profissional por ano"
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
        className="min-h-[150px] h-full w-full"
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
            angle={338}
            height={70}
            fontSize={14}
            tickFormatter={(value) =>
              Formatter.getChartLabel(value, typeLabels)
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
