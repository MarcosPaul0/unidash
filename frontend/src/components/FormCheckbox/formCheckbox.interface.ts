import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";
import { formCheckboxVariants } from "./formCheckbox.constant";
import { VariantProps } from "class-variance-authority";

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface FormCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formCheckboxVariants> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  name: string;
  helper?: string;
  options: CheckboxOption[];
}
