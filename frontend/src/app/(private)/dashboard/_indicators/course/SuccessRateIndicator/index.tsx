import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";
import { SuccessRateIndicatorProps } from "./successRateIndicator.interface";
import { Formatter } from "@unidash/utils/formatter.util";

export function SuccessRateIndicator({
  currentSuccessRate,
  currentYear,
  previousSuccessRate,
}: SuccessRateIndicatorProps) {
  const percentageObservation = IndicatorBuilder.buildPercentageFromPercentages(
    {
      currentValue: currentSuccessRate,
      previousValue: previousSuccessRate,
      observations: {
        increase: "maior em relação ao ano anterior",
        indifferent: "permaneceu o mesmo em relação ao ano anterior",
        regress: "menor em relação ao ano anterior",
        onlyCurrent: "",
        none: "não há dados cadastrados",
      },
    }
  );

  return (
    <IndicatorCard
      icon={<StudentIcon />}
      observation={percentageObservation.observation}
      situation={percentageObservation.situation}
      title={`Taxa de sucesso em ${currentYear}`}
      value={Formatter.toPercentage(currentSuccessRate)}
      variant="blue"
      tooltip="Indica o percentual de alunos que concluíram o curso em relação aos que ingressaram. Calculada como número de concluintes dividido pelo número de ingressantes, considerando a duração padrão do curso."
    />
  );
}
