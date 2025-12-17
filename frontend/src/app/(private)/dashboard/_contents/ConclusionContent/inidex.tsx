"use client";

import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { CompletionWorkSkeletons } from "../../_charts/courseCompletionWork/CompletionWorkSkeletons";
import { CompletionWorkIndicators } from "../../_charts/courseCompletionWork/CompletionWorkIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";
import { CoursesNotExistsCard } from "../../_components/CoursesNotExistsCard";

export function ConclusionContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator, hasCourses } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getCompletionWorkIndicators,
    });

  if (isFetching) {
    return <CompletionWorkSkeletons />;
  }

  if (!hasCourses) {
    return <CoursesNotExistsCard />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <CompletionWorkIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
