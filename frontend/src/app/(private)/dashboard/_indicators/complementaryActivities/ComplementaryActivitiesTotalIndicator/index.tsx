import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";

export function ComplementaryActivitiesTotalIndicator() {
  const currentTotalActivities = 40;
  const previousTotalActivities = 40;

  const percentageObservation = IndicatorBuilder.buildPercentageFromPercentages(
    {
      currentValue: currentTotalActivities,
      previousValue: previousTotalActivities,
      observations: {
        increase: "mais de atividades em relação ao ano de 2024",
        indifferent: "Permaneceu o mesmo em relação ao ano de 2024",
        regress: "menos de atividades em relação ao ano de 2024",
        onlyCurrent: "",
        none: "",
      },
    }
  );

  return (
    <IndicatorCard
      icon={<StudentIcon />}
      observation={percentageObservation.observation}
      situation={percentageObservation.situation}
      title="Total de atividades em 2025"
      value={currentTotalActivities}
      variant="blue"
    />
  );
}
