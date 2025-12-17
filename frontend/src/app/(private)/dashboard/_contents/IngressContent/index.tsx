"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { StudentIncomingSkeletons } from "../../_charts/ingress/StudentIncomingSkeletons";
import { StudentIncomingIndicators } from "../../_charts/ingress/StudentIncomingIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";
import { CoursesNotExistsCard } from "../../_components/CoursesNotExistsCard";

export function IngressContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator, hasCourses } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getStudentIncomingIndicators,
    });

  if (isFetching) {
    return <StudentIncomingSkeletons />;
  }

  if (!hasCourses) {
    return <CoursesNotExistsCard />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <StudentIncomingIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
