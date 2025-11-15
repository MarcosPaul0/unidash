"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "@unidash/app/(private)/dashboard/_components/ChartCard";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { RegistrationByTypeOfExtensionActivityProps } from "./registrationByTypeOfExtensionActivity.interface";
import { ActivitiesIndicators } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { Formatter } from "@unidash/utils/formatter.util";

export const EXTENSION_ACTIVITIES_LABELS: Record<string, string> = {
  specialProjects: "Projetos especiais",
  participationInCompetitions: "Participação em competições",
  entrepreneurshipAndInnovation: "Empreendedorismo e inovação",
  eventOrganization: "Organização de eventos",
  externalInternship: "Estágios externos",
  cultureAndExtensionProjects: "Projetos de cultura e extensão",
  semiannualProjects: "Projeto semestral",
  workNonGovernmentalOrganization: "Organização não governamental",
  juniorCompanies: "Empresas juniores",
  provisionOfServicesWithSelfEmployedWorkers: "Serviços com autônomo",
};

const chartConfig = {
  firstSemester: {
    label: "Primeiro semestre",
    color: "var(--chart-10)",
  },
  secondSemester: {
    label: "Segundo semestre",
    color: "var(--chart-10)",
  },
  total: {
    label: "Total de atividades",
    color: "var(--chart-10)",
  },
} satisfies ChartConfig;

export function RegistrationByTypeOfExtensionActivity({
  extensionActivities,
}: RegistrationByTypeOfExtensionActivityProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ActivitiesIndicators>({
    indicators: extensionActivities,
    initialData: {
      total: 0,
      data: [],
    },
  });

  return (
    <ChartCard
      title="Número de atividades de extensão por tipo de atividade por ano"
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
              Formatter.getChartLabel(value, EXTENSION_ACTIVITIES_LABELS)
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
