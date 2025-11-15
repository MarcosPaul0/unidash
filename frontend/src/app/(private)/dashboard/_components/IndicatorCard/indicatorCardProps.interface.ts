import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import {
  iconVariants,
  indicatorVariants,
  SituationType,
} from "./indicatorCard.constant";

export interface IndicatorCardProps
  extends VariantProps<typeof iconVariants>,
    VariantProps<typeof indicatorVariants> {
  icon: ReactNode;
  title: string;
  value: number | string;
  tooltip?: string;
  observation?: string;
  situation?: SituationType;
}
