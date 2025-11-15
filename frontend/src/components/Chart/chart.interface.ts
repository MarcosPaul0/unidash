/* eslint-disable @typescript-eslint/no-explicit-any */
export interface XAxisTickProps {
  formatter: (value: any) => string;
  payload: any;
  width?: number;
  angle?: number;
  x: number;
  y: number;
}
