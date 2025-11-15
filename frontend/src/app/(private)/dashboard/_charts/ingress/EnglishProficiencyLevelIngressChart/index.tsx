"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { Cell, Pie, PieChart } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import { EnglishProficiencyLevelIngressChartProps } from "./englishProficiencyLevelIngressChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingEnglishProficiencyLevel } from "@unidash/api/responses/indicators.response";
import { ENGLISH_PROFICIENCY_LEVEL } from "@unidash/api/dtos/studentIncomingData.dto";

const chartConfig = {
  students: {
    label: "Ingressantes",
  },
  [ENGLISH_PROFICIENCY_LEVEL.fluent]: {
    label: "Fluente",
    color: "var(--chart-1)",
  },
  [ENGLISH_PROFICIENCY_LEVEL.intermediate]: {
    label: "Intermediário",
    color: "var(--chart-5)",
  },
  [ENGLISH_PROFICIENCY_LEVEL.low]: {
    label: "Baixo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function EnglishProficiencyLevelIngressChart({
  studentIncomingByEnglishProficiencyLevel,
}: EnglishProficiencyLevelIngressChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingEnglishProficiencyLevel[]>({
    indicators: studentIncomingByEnglishProficiencyLevel,
    initialData: [],
  });

  return (
    <ChartCard
      title="Nível de proficiência em inglês dos alunos ingressantes por ano"
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
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto max-h-[330px] pb-0"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <Pie
            data={indicatorsData}
            dataKey="count"
            label
            nameKey="englishLevel"
            fontSize={18}
            fontWeight={600}
          >
            {indicatorsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  chartConfig[entry.englishLevel]?.color || "var(--chart-5)"
                }
              />
            ))}
          </Pie>

          <ChartLegend
            content={<ChartLegendContent nameKey="englishLevel" />}
            layout="vertical"
            align="right"
            verticalAlign="middle"
            className="flex-col items-start text-base"
          />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}
