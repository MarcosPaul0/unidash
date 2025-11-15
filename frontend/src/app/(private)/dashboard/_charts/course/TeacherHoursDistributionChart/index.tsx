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
import { TeacherHoursDistributionChartProps } from "./teacherHoursDistributionChart.interface";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useSemestersChartConfiguration } from "@unidash/hooks/useSemestersChartConfiguration";
import { SemestersIndicators } from "@unidash/api/responses/indicators.response";

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
    color: "var(--chart-2)",
  },
  secondSemester: {
    label: "Segundo semestre",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function TeacherHoursDistributionChart({
  teachersWorkload,
}: TeacherHoursDistributionChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<SemestersIndicators>({
    indicators: teachersWorkload,
    initialData: {
      hasDataInFirstSemester: false,
      hasDataInSecondSemester: false,
      data: [],
    },
  });

  const { firstSemesterRadius, secondSemesterRadius } =
    useSemestersChartConfiguration({ indicatorsData });

  return (
    <ChartCard
      title="Distribuição de carga horária didática por docente em horas por ano"
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
        <BarChart
          accessibilityLayer
          data={indicatorsData.data}
          margin={{
            top: 32,
          }}
        >
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

          {indicatorsData.hasDataInFirstSemester && (
            <Bar
              dataKey="firstSemester"
              stackId="a"
              fill="var(--color-firstSemester)"
              radius={firstSemesterRadius}
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
              stackId="a"
              fill="var(--color-secondSemester)"
              radius={secondSemesterRadius}
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
