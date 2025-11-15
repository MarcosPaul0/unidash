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
import { KnowledgeDeclaredInTechnologiesChartProps } from "./knowledgeDeclaredInTechnologiesChart.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { IncomingTechnology } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { TECHNOLOGY } from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  count: {
    label: "Motivo",
  },
} satisfies ChartConfig;

const typeLabels = {
  [TECHNOLOGY.internetNavigation]: "Navegação",
  [TECHNOLOGY.softwareInstallation]: "Instalação de softwares",
  [TECHNOLOGY.programmingAndLanguages]: "Programas e linguagens",
  [TECHNOLOGY.spreadsheets]: "Planilhas",
  [TECHNOLOGY.operatingSystemSetup]: "Instalação de SO",
  [TECHNOLOGY.textEditor]: "Editor de texto",
  [TECHNOLOGY.electronicsInstallation]: "Instalação de eletrônicos",
  [TECHNOLOGY.presentationEditing]: "Editoração de apresentações",
  [TECHNOLOGY.videoEditing]: "Edição de vídeo",
  [TECHNOLOGY.drawingApps]: "Aplicativos de desenho",
  [TECHNOLOGY.prototypingPlatform]: "Plataforma de prototipação",
};

export function KnowledgeDeclaredInTechnologiesChart({
  studentIncomingByTechnology,
}: KnowledgeDeclaredInTechnologiesChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingTechnology[]>({
    indicators: studentIncomingByTechnology,
    initialData: [],
  });

  return (
    <ChartCard
      title="Conhecimentos declarados em tecnologias pelos ingressantes por ano"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      complement={
        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      }
    >
      <ChartContainer className="min-h-[440px] w-full" config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          layout="vertical"
          margin={{
            left: 50,
          }}
        >
          <YAxis
            dataKey="technology"
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
                width={110}
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
            fill="var(--chart-10)"
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
