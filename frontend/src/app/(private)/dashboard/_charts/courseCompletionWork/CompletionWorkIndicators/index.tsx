import { Topic } from "../../../_components/Topic";
import { PerformanceInDefensesChart } from "../PerformanceInDefensesChart";
import { WorkStatusChart } from "../WorkStatusChart";
import { CompletionWorkIndicatorsProps } from "./completionWorkIndicators.interface";

export function CompletionWorkIndicators({
  indicators,
}: CompletionWorkIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores de Trabalhos de Conclusão de Curso" />

      <WorkStatusChart worksStatus={indicators?.worksStatus} />

      <PerformanceInDefensesChart
        orientationsByTeacher={indicators?.orientationsByTeacher}
      />
    </>
  );
}
