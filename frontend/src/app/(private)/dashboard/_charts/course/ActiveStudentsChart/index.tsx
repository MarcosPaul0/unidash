"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "../../../_components/ChartCard";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ActiveStudentsChartProps } from "./activeStudentsChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ActiveStudentsByIngress } from "@unidash/api/responses/indicators.response";
import { CardFooter } from "@unidash/components/Card";

const chartConfig = {
  numberOfStudents: {
    label: "Número de estudantes",
  },
} satisfies ChartConfig;

export function ActiveStudentsChart({
  activeStudents,
}: ActiveStudentsChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ActiveStudentsByIngress>({
    indicators: activeStudents,
    initialData: {
      data: [],
      total: 0,
    },
  });

  return (
    <ChartCard
      title="Número de alunos ativos por ano de ingresso"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      className="col-span-3"
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
        className="min-h-[440px] max-h-[620px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={indicatorsData.data}
          layout="vertical"
          margin={{
            left: -140,
          }}
          barGap={100}
        >
          <YAxis
            dataKey="ingressYear"
            type="category"
            axisLine={false}
            tickMargin={0}
            width={190}
            fontSize={14}
          />

          <XAxis dataKey="numberOfStudents" type="number" hide />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar
            dataKey="numberOfStudents"
            layout="vertical"
            radius={8}
            fill="var(--chart-7)"
          >
            <LabelList
              dataKey="numberOfStudents"
              position="center"
              offset={12}
              className="fill-card text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      <CardFooter
        className={`
          bg-table-head py-2 px-6 rounded-lg flex 
          items-center justify-between
        `}
      >
        <strong>Total de alunos ativos</strong>

        <strong>{indicatorsData.total}</strong>
      </CardFooter>
    </ChartCard>
  );
}
