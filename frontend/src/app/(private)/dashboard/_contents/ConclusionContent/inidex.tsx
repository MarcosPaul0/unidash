"use client";

import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { CompletionWorkSkeletons } from "../../_charts/courseCompletionWork/CompletionWorkSkeletons";
import { CompletionWorkIndicators } from "../../_charts/courseCompletionWork/CompletionWorkIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function ConclusionContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getCompletionWorkIndicators,
    });

  if (isFetching) {
    return <CompletionWorkSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <CompletionWorkIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
