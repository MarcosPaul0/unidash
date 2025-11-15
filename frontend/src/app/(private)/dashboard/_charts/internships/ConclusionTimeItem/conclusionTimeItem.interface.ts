import { ReactNode } from "react";

export interface ConclusionTimeItemProps {
  title: string;
  value: number;
  icon: ReactNode;
  color?: "green" | "blue" | "red" | "yellow" | "orange" | "purple";
}
