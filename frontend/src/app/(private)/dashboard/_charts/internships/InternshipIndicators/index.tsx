import { Topic } from "../../../_components/Topic";
import { CitiesWithTheHighestInternshipsChart } from "../CitiesWithTheHighestInternshipsChart";
import { DistributionOfTimeSpentCompletingInternshipCard } from "../DistributionOfTimeSpentCompletingInternshipCard";
import { EmploymentTypeInternshipsChart } from "../EmploymentTypeInternshipsChart";
import { InternshipsByRoleChart } from "../InternshipsByRoleChart";
import { TotalNumberOfInternshipsByTeacherChart } from "../TotalNumberOfInternshipsByTeacherChart";
import { InternshipIndicatorsProps } from "./internshipIndicators.interface";

export function InternshipIndicators({
  indicators,
}: InternshipIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores de Estágios Supervisionados" />

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <CitiesWithTheHighestInternshipsChart
          internshipsByCity={indicators?.internshipsByCity}
        />

        <InternshipsByRoleChart
          internshipsByRole={indicators?.internshipsByRole}
        />
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-7 md:gap-8">
        <DistributionOfTimeSpentCompletingInternshipCard
          internshipsByConclusionTime={indicators?.internshipsByConclusionTime}
        />

        <EmploymentTypeInternshipsChart
          internshipsByEmploymentType={indicators?.internshipsByEmploymentType}
        />
      </div>

      <TotalNumberOfInternshipsByTeacherChart
        internshipsByAdvisor={indicators?.internshipsByAdvisor}
      />
    </>
  );
}
