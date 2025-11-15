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
import { ReasonsGivenForChoosingUniversityChartProps } from "./reasonsGivenForChoosingUniversityChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingUniversityChoiceReason } from "@unidash/api/responses/indicators.response";
import { UNIVERSITY_CHOICE_REASON } from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  count: {
    label: "Motivo",
  },
} satisfies ChartConfig;

const typeLabels = {
  [UNIVERSITY_CHOICE_REASON.reputation]: "Renome da UNIFEI",
  [UNIVERSITY_CHOICE_REASON.closePeople]: "Pessoas próximas",
  [UNIVERSITY_CHOICE_REASON.publicEducation]: "Ensino público",
  [UNIVERSITY_CHOICE_REASON.professionalReasons]: "Motivos profissionais",
  [UNIVERSITY_CHOICE_REASON.financialReasons]: "Motivos financeiros",
  [UNIVERSITY_CHOICE_REASON.notFirstChoice]: "Não foi primeira escolha",
  [UNIVERSITY_CHOICE_REASON.closeOriginCity]: "Próximo a cidade de origem",
  [UNIVERSITY_CHOICE_REASON.other]: "Outras",
};

export function ReasonsGivenForChoosingUniversityChart({
  studentIncomingByUniversityChoiceReason,
}: ReasonsGivenForChoosingUniversityChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingUniversityChoiceReason[]>({
    indicators: studentIncomingByUniversityChoiceReason,
    initialData: [],
  });

  return (
    <ChartCard
      title="Motivos declarados pelos ingressantes para escolha da universidade por ano"
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
            left: 48,
          }}
          barGap={100}
        >
          <YAxis
            dataKey="choiceReason"
            type="category"
            interval={0}
            tickLine={false}
            tickMargin={50}
            axisLine={false}
            tick={(props) => (
              <XAxisTick
                formatter={(value) =>
                  Formatter.getChartLabel(value, typeLabels)
                }
                x={props.x}
                y={props.y - 10}
                payload={props.payload}
                width={120}
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
            fill="var(--chart-7)"
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
