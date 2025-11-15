"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxisTick,
} from "@unidash/components/Chart";
import { ReasonsGivenForChoosingTheCourseChartProps } from "./reasonsGivenForChoosingTheCourseChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { IncomingCourseChoiceReason } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { COURSE_CHOICE_REASON } from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  count: {
    label: "Motivo",
  },
} satisfies ChartConfig;

const typeLabels = {
  [COURSE_CHOICE_REASON.hobbyRelation]: "Relação com hobby",
  [COURSE_CHOICE_REASON.financialReasons]: "Financeiros",
  [COURSE_CHOICE_REASON.courseQuality]: "Qualidade do curso",
  [COURSE_CHOICE_REASON.sisuPreference]: "Interessante SISU",
  [COURSE_CHOICE_REASON.notFirstChoice]: "Não foi a primeira escolha",
  [COURSE_CHOICE_REASON.higherEducationDesire]: "Desejo de graduação",
  [COURSE_CHOICE_REASON.professionalUpdate]: "Atualização profissional",
  [COURSE_CHOICE_REASON.other]: "Outro",
};

export function ReasonsGivenForChoosingTheCourseChart({
  studentIncomingByCourseChoiceReason,
}: ReasonsGivenForChoosingTheCourseChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingCourseChoiceReason[]>({
    indicators: studentIncomingByCourseChoiceReason,
    initialData: [],
  });

  return (
    <ChartCard
      title="Motivos declarados pelos ingressantes para escolha do curso por ano"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
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
          layout="vertical"
          margin={{
            left: 30,
          }}
        >
          <YAxis
            dataKey="choiceReason"
            type="category"
            interval={0}
            tickLine={false}
            tickMargin={40}
            axisLine={false}
            tick={(props) => (
              <XAxisTick
                formatter={(value) =>
                  Formatter.getChartLabel(value, typeLabels)
                }
                x={props.x}
                y={props.y - 10}
                payload={props.payload}
                width={100}
                angle={0}
              />
            )}
          />

          <XAxis dataKey="count" type="number" hide />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar
            dataKey="count"
            layout="vertical"
            radius={8}
            fill="var(--chart-8)"
          >
            <LabelList
              dataKey="count"
              position="center"
              offset={12}
              className="fill-card text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
