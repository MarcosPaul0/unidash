import { UseSemestersChartConfigurationParams } from "./useSemestersChartConfiguration.interface";

export function useSemestersChartConfiguration({
  indicatorsData,
}: UseSemestersChartConfigurationParams) {
  const firstSemesterRadius: [number, number, number, number] =
    indicatorsData?.hasDataInSecondSemester ? [0, 0, 8, 8] : [8, 8, 8, 8];
  const secondSemesterRadius: [number, number, number, number] =
    indicatorsData?.hasDataInFirstSemester ? [8, 8, 0, 0] : [8, 8, 8, 8];

  return {
    firstSemesterRadius,
    secondSemesterRadius,
  };
}
