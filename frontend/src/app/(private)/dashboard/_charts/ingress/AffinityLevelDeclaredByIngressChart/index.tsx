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
import { AffinityLevelDeclaredByIngressChartProps } from "./affinityLevelDeclaredByIngressChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingAffinityByDiscipline } from "@unidash/api/responses/indicators.response";
import {
  AFFINITY_LEVEL,
  HIGH_SCHOOL_DISCIPLINE,
} from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const disciplinesLabels: Record<string, string> = {
  [HIGH_SCHOOL_DISCIPLINE.history]: "História",
  [HIGH_SCHOOL_DISCIPLINE.geography]: "Geografia",
  [HIGH_SCHOOL_DISCIPLINE.portuguese]: "Português",
  [HIGH_SCHOOL_DISCIPLINE.biology]: "Biologia",
  [HIGH_SCHOOL_DISCIPLINE.chemical]: "Química",
  [HIGH_SCHOOL_DISCIPLINE.mathematics]: "Matemática",
  [HIGH_SCHOOL_DISCIPLINE.physical]: "Física",
  [HIGH_SCHOOL_DISCIPLINE.english]: "Inglês",
  [HIGH_SCHOOL_DISCIPLINE.technology]: "Tecnologia",
};

const chartConfig = {
  [AFFINITY_LEVEL.low]: {
    label: "Baixa",
    color: "var(--chart-3)",
  },
  [AFFINITY_LEVEL.medium]: {
    label: "Média",
    color: "var(--chart-5)",
  },
  [AFFINITY_LEVEL.high]: {
    label: "Muita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AffinityLevelDeclaredByIngressChart({
  studentIncomingByAffinityByDiscipline,
}: AffinityLevelDeclaredByIngressChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingAffinityByDiscipline[]>({
    indicators: studentIncomingByAffinityByDiscipline,
    initialData: [],
  });

  return (
    <ChartCard
      title="Nível de afinidade  declarada pelos ingressantes com disciplinas do ensino médio por ano"
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
        className="max-h-[440px] min-h-[440px] w-full"
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
            dataKey="discipline"
            tickLine={false}
            axisLine={false}
            fontSize={14}
            tickFormatter={(value) =>
              Formatter.getChartLabel(value, disciplinesLabels)
            }
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar dataKey="low" fill="var(--color-low)" radius={8}>
            <LabelList
              dataKey="low"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar dataKey="medium" fill="var(--color-medium)" radius={8}>
            <LabelList
              dataKey="medium"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar dataKey="high" fill="var(--color-high)" radius={8}>
            <LabelList
              dataKey="high"
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
