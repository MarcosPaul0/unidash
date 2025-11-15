import { SituationType } from "@unidash/app/(private)/dashboard/_components/IndicatorCard/indicatorCard.constant";

interface Observations {
  indifferent: string;
  increase: string;
  regress: string;
  onlyCurrent: string;
  none: string;
}

export interface PercentageBuilderParams {
  observations: Observations;
  previousValue?: number;
  currentValue?: number;
}

export interface PercentageBuilderReturn {
  situation: SituationType;
  observation: string;
}
