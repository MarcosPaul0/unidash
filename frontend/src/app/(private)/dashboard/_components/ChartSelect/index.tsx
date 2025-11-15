"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@unidash/components/Select";
import { ChartSelectProps } from "./chartSelect.interface";

export function ChartSelect({ options, onChange, value }: ChartSelectProps) {
  const selectIsDisabled = options.length <= 1;

  return (
    <Select
      onValueChange={onChange}
      value={value ?? ""}
      disabled={selectIsDisabled}
    >
      <SelectTrigger
        className={`
            max-w-[160px] bg-input shadow-sm py-2 absolute
            px-4 text-sm font-title font-semibold rounded-xl
            right-6
          `}
      >
        <SelectValue className="" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cursos</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
