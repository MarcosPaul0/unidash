"use client";

import { ActionPlansCardProps } from "./actionPlansCard.interface";
import { ChartSelect } from "../../../_components/ChartSelect";
import { useChartFilter } from "@unidash/hooks/useChartFilter";
import { ActionPlans } from "@unidash/api/responses/indicators.response";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { ActionPlanItem } from "../ActionPlanItem";

export function ActionPlansCard({ actionPlans }: ActionPlansCardProps) {
  const {
    changeFilterOption,
    indicatorsData,
    filterOptions,
    activeFilterOption,
  } = useChartFilter<ActionPlans>({
    indicators: actionPlans,
    initialData: {},
  });

  const hasFirstDescription = Boolean(indicatorsData?.first);
  const hasSecondDescription = Boolean(indicatorsData?.second);

  if (!hasFirstDescription && !hasSecondDescription) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano de ação executado</CardTitle>

        <ChartSelect
          options={filterOptions}
          onChange={changeFilterOption}
          value={activeFilterOption}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-4 w-full">
        {hasFirstDescription && (
          <ActionPlanItem
            title="Descrição das ações no primeiro semestre"
            academicActionPlans={indicatorsData.first?.academicActionPlans}
            administrativeActionPlans={
              indicatorsData.first?.administrativeActionPlans
            }
          />
        )}

        {hasSecondDescription && (
          <ActionPlanItem
            title="Descrição das ações no segundo semestre"
            academicActionPlans={indicatorsData.second?.academicActionPlans}
            administrativeActionPlans={
              indicatorsData.second?.administrativeActionPlans
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
