"use client";

import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { TeacherProductionsSkeletons } from "../../_charts/teachersProductions/TeacherProductionsSkeleton";
import { TeacherProductionsIndicators } from "../../_charts/teachersProductions/TeacherProductionsIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function ProductionsContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getTeacherProductionsIndicators,
    });

  if (isFetching) {
    return <TeacherProductionsSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <TeacherProductionsIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
