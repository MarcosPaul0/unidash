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

const chartData = [
  { teacher: "Adriana", orientations: 186 },
  { teacher: "Rodrigo", orientations: 305 },
  { teacher: "Alexandre", orientations: 237 },
  { teacher: "Minoru", orientations: 73 },
  { teacher: "Pedro", orientations: 209 },
  { teacher: "Rafael", orientations: 214 },
  { teacher: "Luiz", orientations: 214 },
  { teacher: "Adler", orientations: 214 },
  { teacher: "Vanessa", orientations: 214 },
  { teacher: "Bruno", orientations: 214 },
  { teacher: "Melise", orientations: 214 },
];

const chartConfig = {
  orientations: {
    label: "Orientações",
    color: "var(--chart-9)",
  },
} satisfies ChartConfig;

export function WorkGuidanceByTeacherChart() {
  return (
    <ChartCard
      title="Total de orientações de TCC por professor por ano"
      description="Fonte dos dados: registros institucionais da coordenação de TCCs do curso"
    >
      <ChartContainer config={chartConfig} className="min-h-[440px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 32,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="teacher"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={14}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="orientations"
            fill="var(--color-orientations)"
            radius={8}
          >
            <LabelList
              dataKey="orientations"
              position="top"
              offset={12}
              className="fill-card-foreground"
              fontSize={18}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
