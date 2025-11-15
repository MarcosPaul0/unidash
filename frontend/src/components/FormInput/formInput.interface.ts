import { InputHTMLAttributes, ReactNode } from "react";
import { Control } from "react-hook-form";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  name: string;
  icon?: ReactNode;
}
