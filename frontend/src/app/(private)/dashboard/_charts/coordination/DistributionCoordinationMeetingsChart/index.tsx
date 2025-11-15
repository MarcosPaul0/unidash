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
import { DistributionCoordinationMeetingsChartProps } from "./distributionCoordinationMeetingsChart.interface";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  meetingsByUndergraduateChamber: {
    label: "Câmara de graduação",
    color: "var(--chart-7)",
  },
  meetingsByBoardOfDirectors: {
    label: "Conselho diretor",
    color: "var(--chart-10)",
  },
  meetingsByCourseCouncil: {
    label: "Colegiado de curso",
    color: "var(--chart-8)",
  },
  meetingsByNde: {
    label: "NDE",
    color: "var(--chart-11)",
  },
} satisfies ChartConfig;

export function DistributionCoordinationMeetingsChart({
  meetings,
  yearFrom,
  yearTo,
}: DistributionCoordinationMeetingsChartProps) {
  const period = Formatter.getIndicatorsPeriod(yearFrom, yearTo);

  return (
    <ChartCard
      title="Distribuição do número de reuniões da coordenação por tipo de instância ao longo dos anos"
      description={`Fonte dos dados: registros institucionais da coordenação do curso ${period}`}
    >
      <ChartContainer config={chartConfig} className="min-h-[440px] w-full">
        <BarChart
          accessibilityLayer
          data={meetings}
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
            dataKey="meetingsByUndergraduateChamber"
            fill="var(--color-meetingsByUndergraduateChamber)"
            radius={[8, 8, 8, 8]}
          >
            <LabelList
              dataKey="meetingsByUndergraduateChamber"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar
            dataKey="meetingsByBoardOfDirectors"
            fill="var(--color-meetingsByBoardOfDirectors)"
            radius={[8, 8, 8, 8]}
          >
            <LabelList
              dataKey="meetingsByBoardOfDirectors"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar
            dataKey="meetingsByCourseCouncil"
            fill="var(--color-meetingsByCourseCouncil)"
            radius={[8, 8, 8, 8]}
          >
            <LabelList
              dataKey="meetingsByCourseCouncil"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar
            dataKey="meetingsByNde"
            fill="var(--color-meetingsByNde)"
            radius={[8, 8, 8, 8]}
          >
            <LabelList
              dataKey="meetingsByNde"
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
