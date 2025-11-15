"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { ActivitiesSkeletons } from "../../_charts/activities/ActiviteiesSkeletons";
import { ActivitiesIndicators } from "../../_charts/activities/ActivitiesIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function ActivitiesContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getActivitiesIndicators,
    });

  if (isFetching) {
    return <ActivitiesSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <ActivitiesIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
