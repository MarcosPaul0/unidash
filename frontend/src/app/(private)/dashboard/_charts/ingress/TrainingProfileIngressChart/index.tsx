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
import { TrainingProfileIngressChartProps } from "./trainingProfileIngressChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingCurrentEducation } from "@unidash/api/responses/indicators.response";
import { CURRENT_EDUCATION } from "@unidash/api/dtos/studentIncomingData.dto";

const chartConfig = {
  students: {
    label: "Ingressantes",
  },
  [CURRENT_EDUCATION.technicalInField]: {
    label: "Formação técnica na área",
    color: "var(--chart-1)",
  },
  [CURRENT_EDUCATION.technicalOutField]: {
    label: "Formação técnica fora da área",
    color: "var(--chart-3)",
  },
  [CURRENT_EDUCATION.higherInField]: {
    label: "Formação superior na área",
    color: "var(--chart-5)",
  },
  [CURRENT_EDUCATION.higherOutField]: {
    label: "Formação superior fora da área",
    color: "var(--chart-6)",
  },
  [CURRENT_EDUCATION.none]: {
    label: "Não possui",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export function TrainingProfileIngressChart({
  studentIncomingByCurrentEducation,
}: TrainingProfileIngressChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingCurrentEducation[]>({
    indicators: studentIncomingByCurrentEducation,
    initialData: [],
  });

  return (
    <ChartCard
      title="Perfil de formação dos ingressantes por tipo e área de conhecimento por ano"
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
        className="[&_.recharts-pie-label-text]:fill-foreground max-h-[330px] w-full max-w-[720px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <Pie
            data={indicatorsData}
            dataKey="count"
            label
            nameKey="type"
            fontSize={18}
            fontWeight={600}
          >
            {indicatorsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig[entry.type]?.color || "var(--chart-7)"}
              />
            ))}
          </Pie>

          <ChartLegend
            content={<ChartLegendContent nameKey="type" />}
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
