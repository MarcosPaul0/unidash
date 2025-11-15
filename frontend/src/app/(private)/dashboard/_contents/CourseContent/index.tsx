"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { CourseSkeletons } from "../../_charts/course/CourseSkeletons";
import { CourseIndicators } from "../../_charts/course/CourseIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function CourseContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getCourseIndicators,
    });

  if (isFetching) {
    return <CourseSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <CourseIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
