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
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingHobbyOrHabit } from "@unidash/api/responses/indicators.response";
import { HabitsAndHobbiesDeclaredByIngressChartProps } from "./habitsAndHobbiesDeclaredByIngressChart.interface";
import { HOBBY_OR_HABIT } from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  count: {
    label: "Hábito e hobbies",
  },
} satisfies ChartConfig;

const typeLabels = {
  [HOBBY_OR_HABIT.videoGames]: "Jogos eletrônicos",
  [HOBBY_OR_HABIT.physicalActivity]: "Ativideades físicas",
  [HOBBY_OR_HABIT.listeningMusic]: "Ouvir música",
  [HOBBY_OR_HABIT.teamSports]: "Esportes em grupo",
  [HOBBY_OR_HABIT.moviesOrSeries]: "Filmes e séries",
  [HOBBY_OR_HABIT.reading]: "Leitura",
  [HOBBY_OR_HABIT.internetBrowsing]: "Navegar na internet",
  [HOBBY_OR_HABIT.playingInstrument]: "Instrumentos musicais",
  [HOBBY_OR_HABIT.socialMedia]: "Redes sociais",
  [HOBBY_OR_HABIT.traveling]: "Viajar",
  [HOBBY_OR_HABIT.individualSports]: "Esportes individuais",
  [HOBBY_OR_HABIT.handcrafting]: "Trabalhos manuais",
  [HOBBY_OR_HABIT.other]: "Outros",
};

export function HabitsAndHobbiesDeclaredByIngressChart({
  studentIncomingByHobbyOrHabit,
}: HabitsAndHobbiesDeclaredByIngressChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingHobbyOrHabit[]>({
    indicators: studentIncomingByHobbyOrHabit,
    initialData: [],
  });

  return (
    <ChartCard
      title="Hábitos e hobbies declarados pelos alunos ingressantes por ano"
      description="Fonte dos dados: registros institucionais da coordenação do curso"
      complement={
        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      }
    >
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          layout="vertical"
          margin={{
            left: 45,
          }}
        >
          <YAxis
            dataKey="hobbyOrHabit"
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
                width={100}
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
            fill="var(--chart-7)"
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
