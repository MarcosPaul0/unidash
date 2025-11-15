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
import { AssetsDeclaredByIngressChartProps } from "./assetsDeclaredByIngressChart.interface";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { IncomingAsset } from "@unidash/api/responses/indicators.response";
import { ASSET } from "@unidash/api/dtos/studentIncomingData.dto";
import { Formatter } from "@unidash/utils/formatter.util";

const chartConfig = {
  count: {
    label: "Bens",
  },
} satisfies ChartConfig;

const typeLabels = {
  [ASSET.car]: "Carro",
  [ASSET.motorcycle]: "Moto",
  [ASSET.virtualAssistant]: "Assitente virtual",
  [ASSET.payTv]: "TV por assinatura",
  [ASSET.printer]: "Impressora",
  [ASSET.internet]: "Internet",
  [ASSET.tablet]: "Tablet",
  [ASSET.desktopComputer]: "Desktop",
  [ASSET.laptop]: "Notebook",
  [ASSET.smartTv]: "Smart TV",
  [ASSET.smartphone]: "Smartphone",
};

export function AssetsDeclaredByIngressChart({
  studentIncomingByAsset,
}: AssetsDeclaredByIngressChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<IncomingAsset[]>({
    indicators: studentIncomingByAsset,
    initialData: [],
  });

  return (
    <ChartCard
      title="Bens de uso pessoal declarados pelos alunos ingressantes por ano"
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
            left: 40,
          }}
        >
          <YAxis
            dataKey="asset"
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
                y={props.y}
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
            fill="var(--chart-9)"
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
