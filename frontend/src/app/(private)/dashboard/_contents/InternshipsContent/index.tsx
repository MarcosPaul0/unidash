"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { InternshipSkeletons } from "../../_charts/internships/InternshipSkeletons";
import { InternshipIndicators } from "../../_charts/internships/InternshipIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";
import { CoursesNotExistsCard } from "../../_components/CoursesNotExistsCard";

export function InternshipsContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator, hasCourses } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getInternshipIndicators,
    });

  if (isFetching) {
    return <InternshipSkeletons />;
  }

  if (!hasCourses) {
    return <CoursesNotExistsCard />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <InternshipIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
