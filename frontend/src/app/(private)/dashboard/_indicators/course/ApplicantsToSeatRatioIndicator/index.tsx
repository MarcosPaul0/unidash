import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";
import { ApplicantsToSeatRatioIndicatorProps } from "./applicantsToSeatRatioIndicator.interface";
import { Formatter } from "@unidash/utils/formatter.util";

export function ApplicantsToSeatRatioIndicator({
  currentApplicantsToSeatRatio,
  currentYear,
  previousApplicantsToSeatRatio,
}: ApplicantsToSeatRatioIndicatorProps) {
  const percentageObservation = IndicatorBuilder.buildPercentageFromValues({
    currentValue: currentApplicantsToSeatRatio,
    previousValue: previousApplicantsToSeatRatio,
    observations: {
      increase: "maior em relação ao ano anterior",
      indifferent: "permaneceu o mesmo em relação ao ano anterior",
      regress: "menor em relação ao ano anterior",
      onlyCurrent: "",
      none: "não há dados cadastrados",
    },
  });

  return (
    <IndicatorCard
      icon={<StudentIcon />}
      observation={percentageObservation.observation}
      situation={percentageObservation.situation}
      title={`Candidato vaga em ${currentYear}`}
      value={Formatter.toDecimal(currentApplicantsToSeatRatio)}
      variant="blue"
      tooltip="Representa a competitividade do curso no processo seletivo. Calculada como número de inscritos dividido pelo número de vagas ofertadas pela COPS (Coordenação de Processos Seletivos)."
    />
  );
}
