import { ReactNode } from "react";

export interface CardChartProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  complement?: ReactNode;
}
