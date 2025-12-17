"use client";

import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { TeacherProductionsSkeletons } from "../../_charts/teachersProductions/TeacherProductionsSkeleton";
import { TeacherProductionsIndicators } from "../../_charts/teachersProductions/TeacherProductionsIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";
import { CoursesNotExistsCard } from "../../_components/CoursesNotExistsCard";

export function ProductionsContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator, hasCourses } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getTeacherProductionsIndicators,
    });

  if (isFetching) {
    return <TeacherProductionsSkeletons />;
  }

  if (!hasCourses) {
    return <CoursesNotExistsCard />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <TeacherProductionsIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
