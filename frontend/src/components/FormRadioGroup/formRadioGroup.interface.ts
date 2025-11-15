import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";
import { formRadioGroupVariants } from "./formRadioGroup.constant";
import { VariantProps } from "class-variance-authority";

export interface RadioGroupOption {
  value: string | boolean;
  label: string;
}

export interface FormRadioGroupProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formRadioGroupVariants> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  name: string;
  options: RadioGroupOption[];
  label?: string;
  helper?: string;
}
