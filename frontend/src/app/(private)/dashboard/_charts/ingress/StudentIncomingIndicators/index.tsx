import { Topic } from "../../../_components/Topic";
import { AssetsDeclaredByIngressChart } from "../AssetsDeclaredByIngressChart";
import { CourseQuestionsChart } from "../CourseQuestionsChart";
import { DistributionIngressByExpectedProfessionalPerformanceChart } from "../DistributionIngressByExpectedProfessionalPerformanceChart";
import { EnglishProficiencyLevelIngressChart } from "../EnglishProficiencyLevelIngressChart";
import { HabitsAndHobbiesDeclaredByIngressChart } from "../HabitsAndHobbiesDeclaredByIngressChart";
import { KnowledgeDeclaredInTechnologiesChart } from "../KnowledgeDeclaredInTechnologiesChart";
import { AffinityLevelDeclaredByIngressChart } from "../AffinityLevelDeclaredByIngressChart";
import { ReasonsGivenForChoosingTheCourseChart } from "../ReasonsGivenForChoosingTheCourseChart";
import { ReasonsGivenForChoosingUniversityChart } from "../ReasonsGivenForChoosingUniversityChart";
import { TrainingProfileIngressChart } from "../TrainingProfileIngressChart";
import { StudentIncomingIndicatorsProps } from "./incomingIndicators.interface";
import { CourseAndUniversityChoiceChart } from "../CourseAndUniversityChoiceChart";

export function StudentIncomingIndicators({
  indicators,
}: StudentIncomingIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores de Ingresso" />

      <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-9 md:gap-8">
        <CourseAndUniversityChoiceChart
          studentIncomingCourseAndUniversityChoiceDistribution={
            indicators?.studentIncomingCourseAndUniversityChoiceDistribution
          }
        />
        <TrainingProfileIngressChart
          studentIncomingByCurrentEducation={
            indicators?.studentIncomingByCurrentEducation
          }
        />
      </div>

      <AffinityLevelDeclaredByIngressChart
        studentIncomingByAffinityByDiscipline={
          indicators?.studentIncomingByAffinityByDiscipline
        }
      />

      <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-2 md:gap-8">
        <CourseQuestionsChart
          studentIncomingByCourseComplements={
            indicators?.studentIncomingByCourseComplements
          }
        />

        <DistributionIngressByExpectedProfessionalPerformanceChart
          studentIncomingByWorkExpectation={
            indicators?.studentIncomingByWorkExpectation
          }
        />
      </div>

      <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-3 md:gap-8">
        <ReasonsGivenForChoosingTheCourseChart
          studentIncomingByCourseChoiceReason={
            indicators?.studentIncomingByCourseChoiceReason
          }
        />

        <ReasonsGivenForChoosingUniversityChart
          studentIncomingByUniversityChoiceReason={
            indicators?.studentIncomingByUniversityChoiceReason
          }
        />

        <KnowledgeDeclaredInTechnologiesChart
          studentIncomingByTechnology={indicators?.studentIncomingByTechnology}
        />
      </div>

      <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-2 md:gap-8">
        <AssetsDeclaredByIngressChart
          studentIncomingByAsset={indicators?.studentIncomingByAsset}
        />

        <HabitsAndHobbiesDeclaredByIngressChart
          studentIncomingByHobbyOrHabit={
            indicators?.studentIncomingByHobbyOrHabit
          }
        />
      </div>

      <div className="flex flex-col gap-4 2xl:grid 2xl:grid-cols-7 md:gap-8">
        <EnglishProficiencyLevelIngressChart
          studentIncomingByEnglishProficiencyLevel={
            indicators?.studentIncomingByEnglishProficiencyLevel
          }
        />
      </div>
    </>
  );
}
