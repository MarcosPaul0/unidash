"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { CoordinationSkeletons } from "../../_charts/coordination/CoordinationSkeletons";
import { CoordinationIndicators } from "../../_charts/coordination/CoordinationIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function CoordinationContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getCoordinationIndicators,
    });

  if (isFetching) {
    return <CoordinationSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <CoordinationIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
