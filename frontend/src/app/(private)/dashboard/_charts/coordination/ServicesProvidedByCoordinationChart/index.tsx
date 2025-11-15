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
import { ServicesProvidedByCoordinationChartProps } from "./servicesProvidedByCoordinationChart.interface";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  servicesRequestsByEmail: {
    label: "Email",
    color: "var(--chart-8)",
  },
  servicesRequestsBySystem: {
    label: "SIGAA",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export function ServicesProvidedByCoordinationChart({
  services,
  yearFrom,
  yearTo,
}: ServicesProvidedByCoordinationChartProps) {
  const period = Formatter.getIndicatorsPeriod(yearFrom, yearTo);

  return (
    <ChartCard
      title="Número de atendimentos realizados pela coordenação por tipo de canal ao longo dos anos"
      description={`Fonte dos dados: registros institucionais da coordenação do curso ${period}`}
    >
      <ChartContainer config={chartConfig} className="min-h-[440px] w-full">
        <BarChart
          accessibilityLayer
          data={services}
          margin={{
            top: 32,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            fontSize={14}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="servicesRequestsByEmail"
            fill="var(--color-servicesRequestsByEmail)"
            radius={8}
          >
            <LabelList
              dataKey="servicesRequestsByEmail"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar
            dataKey="servicesRequestsBySystem"
            fill="var(--color-servicesRequestsBySystem)"
            radius={8}
          >
            <LabelList
              dataKey="servicesRequestsBySystem"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          {/* <Bar
            dataKey="resolution"
            fill="var(--color-resolution)"
            radius={8}
          >
            <LabelList
              dataKey="resolution"
              position="top"
              offset={12}
              className="fill-card-foreground"
              fontSize={18}
              fontWeight={600}
            />
          </Bar> */}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
