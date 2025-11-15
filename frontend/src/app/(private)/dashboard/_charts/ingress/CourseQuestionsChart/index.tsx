"use client";

import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  XAxisTick,
} from "@unidash/components/Chart";
import { CourseQuestionsChartProps } from "./courseQuestionsChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingCourseComplements } from "@unidash/api/responses/indicators.response";
import { Formatter } from "@unidash/utils/formatter.util";

const questionsLabels: Record<string, string> = {
  knowRelatedCourseDifference: "Sabe a diferença entre cursos/áreas correlatos",
  nocturnalPreference: "Gostaria que o curso fosse noturno",
  readPedagogicalProject: "Analizou o PPC",
};

const chartConfig = {
  yes: {
    label: "Sim",
    color: "var(--chart-1)",
  },
  no: {
    label: "Não",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function CourseQuestionsChart({
  studentIncomingByCourseComplements,
}: CourseQuestionsChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingCourseComplements[]>({
    indicators: studentIncomingByCourseComplements,
    initialData: [],
  });

  return (
    <ChartCard
      title="Conhecimento prévio e desejo de curso noturno entre ingressantes"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      complement={
        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      }
    >
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          margin={{
            left: 0,
          }}
        >
          <XAxis
            dataKey="question"
            tickMargin={10}
            axisLine={false}
            fontSize={12}
            height={40}
            tick={(props) => (
              <XAxisTick
                formatter={(value) =>
                  Formatter.getChartLabel(value, questionsLabels)
                }
                x={props.x}
                y={props.y}
                payload={props.payload}
                width={200}
                angle={0}
              />
            )}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar dataKey="yes" radius={8} fill="var(--color-yes)">
            <LabelList
              dataKey="yes"
              position="center"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar dataKey="no" radius={8} fill="var(--color-no)">
            <LabelList
              dataKey="no"
              position="center"
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
