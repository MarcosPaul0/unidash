"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartCard } from "../../../_components/ChartCard";
import { ResearchAndExtensionProjectsByTeacherChartProps } from "./researchAndExtensionProjectsByTeacherChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { ProjectsByTeacher } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";

const chartConfig = {
  researchProjects: {
    label: "Projetos de pesquisa",
    color: "var(--chart-7)",
  },
  extensionProjects: {
    label: "Projetos de extensão",
    color: "var(--chart-10)",
  },
} satisfies ChartConfig;

export function ResearchAndExtensionProjectsByTeacherChart({
  researchAndExtensionProjectsByTeacher,
}: ResearchAndExtensionProjectsByTeacherChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ProjectsByTeacher[]>({
    indicators: researchAndExtensionProjectsByTeacher,
    initialData: [],
  });

  return (
    <ChartCard
      title="Projetos de pesquisa e extensão realizadas pelos professores"
      description="Fonte dos dados: registros institucionais dos docentes do curso"
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
        <BarChart accessibilityLayer data={indicatorsData}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="teacher"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            angle={330}
            height={80}
            fontSize={14}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar
            dataKey="researchProjects"
            fill="var(--color-researchProjects)"
            radius={8}
          >
            <LabelList
              dataKey="researchProjects"
              position="inside"
              accumulate="none"
              offset={12}
              className="fill-card text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>

          <Bar
            dataKey="extensionProjects"
            fill="var(--color-extensionProjects)"
            radius={8}
          >
            <LabelList
              dataKey="extensionProjects"
              position="inside"
              accumulate="none"
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
