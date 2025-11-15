import { Topic } from "../../../_components/Topic";
import { ActionPlansCard } from "../ActionPlansCard";
import { DistributionCoordinationMeetingsChart } from "../DistributionCoordinationMeetingsChart";
import { ServicesProvidedByCoordinationChart } from "../ServicesProvidedByCoordinationChart";
import { CoordinationIndicatorsProps } from "./coordinationIndicators.interface";

export function CoordinationIndicators({
  indicators,
}: CoordinationIndicatorsProps) {
  const yearToIndicators = indicators?.period?.[0] ?? null;
  const yearFromIndicators =
    indicators?.period && indicators.period.length > 1
      ? indicators.period[indicators.period.length - 1]
      : null;

  return (
    <>
      <Topic title="Indicadores da Coordenação do Curso" />

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <DistributionCoordinationMeetingsChart
          meetings={indicators?.meetings ?? []}
          yearFrom={yearFromIndicators}
          yearTo={yearToIndicators}
        />

        <ServicesProvidedByCoordinationChart
          services={indicators?.services ?? []}
          yearFrom={yearFromIndicators}
          yearTo={yearToIndicators}
        />
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <ActionPlansCard actionPlans={indicators?.actionPlans} />
      </div>
    </>
  );
}
