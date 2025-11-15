"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@unidash/components/Form";
import { FormRadioGroupProps } from "./formRadioGroup.interface";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import { cn } from "@unidash/lib/cn";
import { formRadioGroupVariants } from "./formRadioGroup.constant";

export function FormRadioGroup({
  name,
  control,
  options,
  direction,
  label,
  helper,
}: FormRadioGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(formRadioGroupVariants({ direction }))}
            >
              {options.map((option) => (
                <FormItem
                  className="flex items-center gap-3"
                  key={String(option.value)}
                >
                  <FormControl>
                    <RadioGroupItem value={option.value as string} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          {helper && <FormMessage>{helper}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
