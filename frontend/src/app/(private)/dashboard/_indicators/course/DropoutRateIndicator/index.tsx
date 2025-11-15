import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";
import { DropoutRateIndicatorProps } from "./dropoutRateIndicator.interface";
import { Formatter } from "@unidash/utils/formatter.util";

export function DropoutRateIndicator({
  currentDropoutRate,
  currentYear,
  previousDropoutRate,
}: DropoutRateIndicatorProps) {
  const percentageObservation = IndicatorBuilder.buildPercentageFromPercentages(
    {
      currentValue: currentDropoutRate,
      previousValue: previousDropoutRate,
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
      title={`Taxa de evasão em ${currentYear}`}
      value={Formatter.toPercentage(currentDropoutRate)}
      variant="blue"
      tooltip="Mostra a proporção de estudantes que abandonam o curso antes da conclusão. Calculada como número de alunos evadidos dividido pelo número de matriculados, com base nos relatórios anuais de cancelamento."
    />
  );
}
