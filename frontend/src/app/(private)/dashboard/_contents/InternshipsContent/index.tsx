"use client";

import { IndicatorsCSService } from "@unidash/services/indicators/indicators.cs.service";
import { useFetchIndicators } from "@unidash/hooks/useFetchIndicators";
import { InternshipSkeletons } from "../../_charts/internships/InternshipSkeletons";
import { InternshipIndicators } from "../../_charts/internships/InternshipIndicators";
import { CourseNotSelectedCard } from "../../_components/CourseNotSelectedCard";
import { EmptyIndicatorsCard } from "../../_components/EmptyIndicatorsCard";

export function InternshipsContent() {
  const { indicators, isFetching, courseIsSelected, hasIndicator } =
    useFetchIndicators({
      fetchIndicators: IndicatorsCSService.getInternshipIndicators,
    });

  if (isFetching) {
    return <InternshipSkeletons />;
  }

  if (!courseIsSelected) {
    return <CourseNotSelectedCard />;
  }

  if (hasIndicator) {
    return <InternshipIndicators indicators={indicators} />;
  }

  return <EmptyIndicatorsCard />;
}
