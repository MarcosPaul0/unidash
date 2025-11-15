import {
  ChartLineDownIcon,
  ChartLineUpIcon,
  EqualsIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";

export const iconVariants = cva(`rounded-full p-2 w-fit text-2xl`, {
  variants: {
    variant: {
      green: "bg-icon-green text-icon-green-foreground",
      blue: "bg-icon-blue text-icon-blue-foreground",
      red: "bg-icon-red text-icon-red-foreground",
      yellow: "bg-icon-yellow text-icon-yellow-foreground",
      orange: "bg-icon-orange text-icon-orange-foreground",
      purple: "bg-icon-purple text-icon-purple-foreground",
    },
  },
  defaultVariants: {
    variant: "green",
  },
});

export const indicatorVariants = cva(``, {
  variants: {
    size: {
      lg: "text-3xl",
      md: "text-2xl",
      sm: "text-xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const SITUATION_TYPE = {
  none: "none",
  indifferent: "indifferent",
  increase: "increase",
  regress: "regress",
  onlyCurrent: "onlyCurrent",
} as const;

export const SITUATION_ICON = {
  [SITUATION_TYPE.indifferent]: (
    <EqualsIcon size={28} className="text-indifferent" />
  ),
  [SITUATION_TYPE.increase]: (
    <ChartLineUpIcon size={28} className="text-increase" />
  ),
  [SITUATION_TYPE.regress]: (
    <ChartLineDownIcon size={28} className="text-regress" />
  ),
  [SITUATION_TYPE.onlyCurrent]: null,
  [SITUATION_TYPE.none]: null,
} as const;

export type SituationType =
  (typeof SITUATION_TYPE)[keyof typeof SITUATION_TYPE];
