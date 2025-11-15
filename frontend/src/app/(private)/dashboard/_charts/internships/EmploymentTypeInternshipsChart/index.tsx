"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@unidash/components/Chart";
import { ChartCard } from "@unidash/app/(private)/dashboard/_components/ChartCard";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { EmploymentTypeInternshipsChartProps } from "./employmentTypeInternshipsChart.interface";
import { InternshipByEmploymentType } from "@unidash/api/responses/indicators.response";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ChartSelect } from "../../../_components/ChartSelect";
import { Formatter } from "@unidash/utils/formatter.util";
import { EMPLOYMENT_TYPE } from "@unidash/api/dtos/courseInternshipData.dto";

const typeLabels: Record<string, string> = {
  [EMPLOYMENT_TYPE.employmentContract]: "CLT",
  [EMPLOYMENT_TYPE.independentContractor]: "PJ",
  [EMPLOYMENT_TYPE.internship]: "Estágio",
};

const chartConfig = {
  count: {
    label: "Estágios por vínculo empregatício",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export function EmploymentTypeInternshipsChart({
  internshipsByEmploymentType,
}: EmploymentTypeInternshipsChartProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<InternshipByEmploymentType[]>({
    indicators: internshipsByEmploymentType,
    initialData: [],
  });

  return (
    <ChartCard
      title="Número de estágios supervisionados por tipo de vínculo empregatício por ano"
      description="Fonte dos dados: registros institucionais da coordenação de estágios curso"
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
        className="min-h-[440px] max-h-[440px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={indicatorsData}
          margin={{
            top: 32,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="employmentType"
            tickFormatter={(value) =>
              Formatter.getChartLabel(value, typeLabels)
            }
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            angle={-18}
            fontSize={14}
            height={60}
          />

          <ChartTooltip content={<ChartTooltipContent hideLabel />} />

          <ChartLegend content={<ChartLegendContent />} className="text-base" />

          <Bar dataKey="count" fill="var(--color-count)" radius={8}>
            <LabelList
              dataKey="count"
              position="top"
              offset={12}
              className="fill-card-foreground text-sm md:text-lg"
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
