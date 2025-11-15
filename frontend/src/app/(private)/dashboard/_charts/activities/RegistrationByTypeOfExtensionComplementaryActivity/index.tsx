"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "@unidash/app/(private)/dashboard/_components/ChartCard";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { RegistrationByTypeOfExtensionComplementaryActivityProps } from "./registrationByTypeOfExtensionComplementaryActivity.interface";
import { ActivitiesIndicators } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { Formatter } from "@unidash/utils/formatter.util";

export const EXTENSION_COMPLEMENTARY_ACTIVITIES_LABELS: Record<string, string> =
  {
    culturalActivities: "Atividades culturais",
    sportsCompetitions: "Competições esportivas",
    awardsAtEvents: "Premiação em eventos",
    studentRepresentation: "Representação estudantil",
    participationInCollegiateBodies: "Participação em órgãos colegiados",
  };

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
    color: "var(--chart-9)",
  },
  secondSemester: {
    label: "Segundo semestre",
    color: "var(--chart-9)",
  },
  total: {
    label: "Total de atividades",
    color: "var(--chart-9)",
  },
} satisfies ChartConfig;

export function RegistrationByTypeOfExtensionComplementaryActivity({
  extensionComplementaryActivities,
}: RegistrationByTypeOfExtensionComplementaryActivityProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ActivitiesIndicators>({
    indicators: extensionComplementaryActivities,
    initialData: {
      total: 0,
      data: [],
    },
  });

  return (
    <ChartCard
      title="Número de atividades complementares na dimenção extensão por tipo de atividade por ano"
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
            left: -10,
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
                EXTENSION_COMPLEMENTARY_ACTIVITIES_LABELS
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
