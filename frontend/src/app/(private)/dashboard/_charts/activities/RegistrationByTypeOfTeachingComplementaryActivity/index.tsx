"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "@unidash/app/(private)/dashboard/_components/ChartCard";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { RegistrationByTypeOfTeachingComplementaryActivityProps } from "./registrationByTypeOfTeachingComplementaryActivity.interface";
import { ActivitiesIndicators } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { Formatter } from "@unidash/utils/formatter.util";

export const TEACHING_COMPLEMENTARY_ACTIVITIES_LABELS: Record<string, string> =
  {
    subjectMonitoring: "Monitoria de disciplinas",
    sponsorshipOfNewStudents: "Apadrinhamento",
    providingTraining: "Treinamentos",
    coursesInTheArea: "Cursos na área do curso",
    coursesOutsideTheArea: "Cursos não relacionados ao curso",
    electivesDisciplines: "Disciplinas eletivas",
    complementaryCoursesInTheArea: "Cursos complementares ao curso",
    preparationForTest: "Preparação ENADE",
  };

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
  },
  secondSemester: {
    label: "Segundo semestre",
  },
  total: {
    label: "Total de atividades",
    color: "var(--chart-12)",
  },
} satisfies ChartConfig;

export function RegistrationByTypeOfTeachingComplementaryActivity({
  teachingComplementaryActivities,
}: RegistrationByTypeOfTeachingComplementaryActivityProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ActivitiesIndicators>({
    indicators: teachingComplementaryActivities,
    initialData: {
      total: 0,
      data: [],
    },
  });

  return (
    <ChartCard
      title="Número de atividades complementares na dimenção ensino por tipo de atividade por ano"
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
        className="min-h-[440px] max-h-[440px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={indicatorsData.data}
          layout="vertical"
          margin={{
            left: 10,
          }}
          barGap={100}
        >
          <YAxis
            dataKey="type"
            type="category"
            axisLine={false}
            tickMargin={0}
            width={190}
            fontSize={14}
            tickFormatter={(value) =>
              Formatter.getChartLabel(
                value,
                TEACHING_COMPLEMENTARY_ACTIVITIES_LABELS
              )
            }
          />

          <XAxis dataKey="total" type="number" hide />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar
            dataKey="total"
            layout="vertical"
            radius={8}
            fill="var(--color-total)"
          >
            <LabelList
              dataKey="total"
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
