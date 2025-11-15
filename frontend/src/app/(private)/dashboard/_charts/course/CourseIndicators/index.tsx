import { Topic } from "../../../_components/Topic";
import { ApplicantsToSeatRatioIndicator } from "../../../_indicators/course/ApplicantsToSeatRatioIndicator";
import { DropoutRateIndicator } from "../../../_indicators/course/DropoutRateIndicator";
import { OccupancyRateIndicator } from "../../../_indicators/course/OccupancyRateIndicator";
import { SuccessRateIndicator } from "../../../_indicators/course/SuccessRateIndicator";
import { ActiveStudentsChart } from "../ActiveStudentsChart";
import { DistributionStudentsExitChart } from "../DistributionStudentsExitChart";
import { RegistrationLocksChart } from "../RegistrationLocksChart ";
import { TeacherHoursDistributionChart } from "../TeacherHoursDistributionChart";
import {
  CourseIndicatorsProps,
  IndicatorsCardsProps,
} from "./courseIndicators.interface";
import { IndicatorBuilder } from "@unidash/utils/indicatorBuilder/indicatorBuilder.util";

export function IndicatorsCards({ complements }: IndicatorsCardsProps) {
  if (!complements) {
    return null;
  }

  const years = Object.keys(complements).reverse();

  if (years.length === 0) {
    return null;
  }

  const currentYear = years[0];
  const previousYear = years[1];

  const current = IndicatorBuilder.buildCourseComplementsIndicators(
    currentYear,
    complements
  );
  const previous = IndicatorBuilder.buildCourseComplementsIndicators(
    previousYear,
    complements
  );

  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
      <ApplicantsToSeatRatioIndicator
        currentApplicantsToSeatRatio={current.applicantsToSeatRatio}
        previousApplicantsToSeatRatio={previous.applicantsToSeatRatio}
        currentYear={currentYear}
      />

      <OccupancyRateIndicator
        currentOccupancyRate={current.occupancyRate}
        previousOccupancyRate={previous.occupancyRate}
        currentYear={currentYear}
      />

      <DropoutRateIndicator
        currentDropoutRate={current.dropoutRate}
        previousDropoutRate={previous.dropoutRate}
        currentYear={currentYear}
      />

      <SuccessRateIndicator
        currentSuccessRate={current.successRate}
        previousSuccessRate={previous.successRate}
        currentYear={currentYear}
      />
    </div>
  );
}

export function CourseIndicators({ indicators }: CourseIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores do Curso" />

      <IndicatorsCards complements={indicators?.complements} />

      <div className="flex flex-col 2xl:grid 2xl:grid-cols-7 gap-4 md:gap-8">
        <ActiveStudentsChart activeStudents={indicators?.activeStudents} />

        <RegistrationLocksChart
          registrationLocks={indicators?.registrationLocks}
        />
      </div>

      <DistributionStudentsExitChart departures={indicators?.departures} />

      <TeacherHoursDistributionChart
        teachersWorkload={indicators?.teachersWorkload}
      />
    </>
  );
}
