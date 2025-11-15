/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@unidash/components/Form";
import { FormCheckboxProps } from "./formCheckbox.interface";
import { Checkbox } from "../Checkbox";
import { cn } from "@unidash/lib/cn";
import { formCheckboxVariants } from "./formCheckbox.constant";

export function FormCheckbox({
  name,
  control,
  options,
  helper,
  cols,
}: FormCheckboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn(formCheckboxVariants({ cols }))}>
          {options.map((option) => (
            <FormField
              key={option.value}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option.value}
                    className="flex flex-row items-center gap-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: any) => value !== option.value
                                )
                              );
                        }}
                      />
                    </FormControl>

                    <FormLabel className="text-sm font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}

          {helper && <FormMessage>{helper}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
