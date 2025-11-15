import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";
import { StudentsActiveIndicatorProps } from "./studentsActiveIndicator.interface";

export function StudentsActiveIndicator({
  currentStudentsActive,
  previousStudentsActive,
}: StudentsActiveIndicatorProps) {
  const percentageObservation = IndicatorBuilder.buildPercentageFromValues({
    currentValue: currentStudentsActive,
    previousValue: previousStudentsActive,
    observations: {
      increase: "mais alunos ativos em relação ao ano de 2024",
      indifferent: "Permaneceu o mesmo em relação ao ano de 2024",
      regress: "menos alunos ativos em relação ao ano de 2024",
      onlyCurrent: "Taxa atual referente ao ano de 2025",
      none: "não há dados cadastrados",
    },
  });

  return (
    <IndicatorCard
      icon={<StudentIcon />}
      observation={percentageObservation.observation}
      situation={percentageObservation.situation}
      title="Alunos ativos em 2025"
      value={currentStudentsActive}
      variant="blue"
    />
  );
}
