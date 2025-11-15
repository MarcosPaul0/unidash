import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";
import { OccupancyRateIndicatorProps } from "./occupancyRateIndicator.interface";
import { Formatter } from "@unidash/utils/formatter.util";

export function OccupancyRateIndicator({
  currentOccupancyRate,
  currentYear,
  previousOccupancyRate,
}: OccupancyRateIndicatorProps) {
  const percentageObservation = IndicatorBuilder.buildPercentageFromPercentages(
    {
      currentValue: currentOccupancyRate,
      previousValue: previousOccupancyRate,
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
      title={`Taxa de ocupação em ${currentYear}`}
      value={Formatter.toPercentage(currentOccupancyRate)}
      variant="blue"
      tooltip="Mede o grau de preenchimento das vagas oferecidas. Calculada como número de ingressantes dividido pelo número de vagas disponibilizadas no processo seletivo."
    />
  );
}
