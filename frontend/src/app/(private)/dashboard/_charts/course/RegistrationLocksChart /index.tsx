"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  XAxisTick,
} from "@unidash/components/Chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import { RegistrationLocksChartProps } from "./registrationLocksChart.interface";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { SemestersIndicators } from "@unidash/api/responses/indicators.response";
import { Formatter } from "@unidash/utils/formatter.util";

const typeLabels: Record<string, string> = {
  difficultyInDiscipline: "Difculdades de acompanhamento da disciplina",
  workload: "Carga horária excessiva",
  teacherMethodology: "Não gostou da metodologia do docente",
  incompatibilityWithWork: "Incompatibilidade com horário do trabalho",
  lossOfInterest: "Perda de interesse",
  other: "Outro",
};

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
    color: "var(--chart-4)",
  },
  secondSemester: {
    label: "Segundo semestre",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function RegistrationLocksChart({
  registrationLocks,
}: RegistrationLocksChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<SemestersIndicators>({
    indicators: registrationLocks,
    initialData: {
      hasDataInFirstSemester: false,
      hasDataInSecondSemester: false,
      data: [],
    },
  });

  return (
    <ChartCard
      title="Número de trancamentos de matrícula por semestre e motivo declarado"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      className="col-span-4"
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
        <BarChart accessibilityLayer data={indicatorsData.data}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="type"
            interval={0}
            tickLine={false}
            tickMargin={40}
            axisLine={false}
            height={100}
            tick={(props) => (
              <XAxisTick
                formatter={(value) =>
                  Formatter.getChartLabel(value, typeLabels)
                }
                x={props.x}
                y={props.y}
                payload={props.payload}
                width={120}
              />
            )}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          {indicatorsData.hasDataInFirstSemester && (
            <Bar
              dataKey="firstSemester"
              fill="var(--color-firstSemester)"
              radius={8}
            >
              <LabelList
                dataKey="firstSemester"
                position="inside"
                accumulate="none"
                offset={12}
                className="fill-card text-sm md:text-lg"
                fontWeight={600}
              />
            </Bar>
          )}

          {indicatorsData.hasDataInSecondSemester && (
            <Bar
              dataKey="secondSemester"
              fill="var(--color-secondSemester)"
              radius={8}
            >
              <LabelList
                dataKey="secondSemester"
                position="inside"
                accumulate="none"
                offset={12}
                className="fill-card text-sm md:text-lg"
                fontWeight={600}
              />
            </Bar>
          )}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
