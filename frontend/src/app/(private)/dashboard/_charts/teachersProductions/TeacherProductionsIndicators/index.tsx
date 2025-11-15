import { Topic } from "../../../_components/Topic";
import { DistributionTechnicalScientificProductionsChart } from "../DistributionTechnicalScientificProductionsChart";
import { ResearchAndExtensionProjectsByTeacherChart } from "../ResearchAndExtensionProjectsByTeacherChart";
import { TechnicalScientificProductionsByTypeAndTeacherChart } from "../TechnicalScientificProductionsByTypeAndTeacherChart";
import { TeacherProductionsIndicatorsProps } from "./teacherProductionsIndicators.interface";

export function TeacherProductionsIndicators({
  indicators,
}: TeacherProductionsIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores de Produções Técnico-Científicas" />

      <DistributionTechnicalScientificProductionsChart
        technicalScientificProductionsByType={
          indicators?.technicalScientificProductionsByType
        }
      />

      <TechnicalScientificProductionsByTypeAndTeacherChart
        technicalScientificProductionsByTeacher={
          indicators?.technicalScientificProductionsByTeacher
        }
      />

      <Topic title="Indicadores de Projetos de Pesquisa e de Extensão" />

      <ResearchAndExtensionProjectsByTeacherChart
        researchAndExtensionProjectsByTeacher={
          indicators?.researchAndExtensionProjectsByTeacher
        }
      />
    </>
  );
}
