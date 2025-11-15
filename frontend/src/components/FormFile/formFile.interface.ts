import { Control } from "react-hook-form";

export interface FormFileProps {
  label?: string;
  helper?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  name: string;
}
