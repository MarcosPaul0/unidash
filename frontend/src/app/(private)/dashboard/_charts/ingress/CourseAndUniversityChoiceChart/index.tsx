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
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import {
  COURSE_AND_UNIVERSITY_CHOICE,
  IncomingCourseAndUniversityChoiceDistribution,
} from "@unidash/api/responses/indicators.response";
import { CourseAndUniversityChoiceChartProps } from "./courseAndUniversityChoiceChart.interface";
import { useIsMobile } from "@unidash/hooks/useIsMobile";

const chartConfig = {
  students: {
    label: "Ingressantes",
  },
  [COURSE_AND_UNIVERSITY_CHOICE.courseIsNotFirstChoice]: {
    label: "A universidade foi a primeira escolha, já o curso não",
    color: "var(--chart-5)",
  },
  [COURSE_AND_UNIVERSITY_CHOICE.universityAndCourseIsFirstChoice]: {
    label: "A universidade e o curso foi a primeira escolha",
    color: "var(--chart-2)",
  },
  [COURSE_AND_UNIVERSITY_CHOICE.universityAndCourseIsNotFirstChoice]: {
    label: "Nem a universidade e nem o curso foram a primeira escolha",
    color: "var(--chart-3)",
  },
  [COURSE_AND_UNIVERSITY_CHOICE.universityIsNotFirstChoice]: {
    label: "O curso foi a primeira escolha, já a universidade não",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export function CourseAndUniversityChoiceChart({
  studentIncomingCourseAndUniversityChoiceDistribution,
}: CourseAndUniversityChoiceChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingCourseAndUniversityChoiceDistribution[]>({
    indicators: studentIncomingCourseAndUniversityChoiceDistribution,
    initialData: [],
  });

  const isMobile = useIsMobile();

  return (
    <ChartCard
      title="Distribuição entre o número de escolha do curso e da universidade pelos alunos, por ano"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      className="col-span-5"
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
        className="[&_.recharts-pie-label-text]:fill-foreground min-h-[500px] md:min-h-auto md:max-h-[330px] w-full md:max-w-[720px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <Pie
            data={indicatorsData}
            dataKey="count"
            label
            nameKey="choiceClassification"
            fontSize={18}
            fontWeight={600}
            height={400}
          >
            {indicatorsData.map((entry) => (
              <Cell
                key={`cell-${entry.choiceClassification}`}
                fill={
                  chartConfig[entry.choiceClassification]?.color ||
                  "var(--chart-5)"
                }
              />
            ))}
          </Pie>

          <ChartLegend
            width={280}
            content={<ChartLegendContent nameKey="choiceClassification" />}
            layout={"vertical"}
            align={isMobile ? "center" : "right"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            className="flex-col items-start text-base"
          />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}
