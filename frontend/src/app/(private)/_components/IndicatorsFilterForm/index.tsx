"use client";

import {
  BroomIcon,
  CalendarDotsIcon,
  CalendarIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Semester, SEMESTER } from "@unidash/api/dtos/courseStudentsData.dto";
import { Button } from "@unidash/components/Button";
import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@unidash/components/Select";
import { useRouter, useSearchParams } from "next/navigation";

const YEARS_OPTIONS: SelectOption[] = [
  {
    label: "2025",
    value: "2025",
  },
  {
    label: "2024",
    value: "2024",
  },
  {
    label: "2023",
    value: "2023",
  },
  {
    label: "2022",
    value: "2022",
  },
  {
    label: "2021",
    value: "2021",
  },
  {
    label: "2020",
    value: "2020",
  },
];

const SEMESTER_OPTIONS: SelectOption[] = [
  {
    label: "Primeiro semestre",
    value: SEMESTER.first,
  },
  {
    label: "Segundo semestre",
    value: SEMESTER.second,
  },
];

export function IndicatorsFilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const year = searchParams.get("year") ?? undefined;
  const semester = searchParams.get("semester") ?? undefined;

  function handleChangeYear(year: string) {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("year", year);
    router.replace(`?${currentParams.toString()}`);
  }

  function handleChangeSemester(semester: Semester) {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("semester", semester);
    router.replace(`?${currentParams.toString()}`);
  }

  function handleClearFilters() {
    router.replace("?", { scroll: false });
  }

  return (
    <form className="flex flex-row items-end w-full gap-4 mt-5 rounded-2xl">
      <Select onValueChange={handleChangeYear} value={year ?? ""}>
        <SelectTrigger className="w-full max-w-[360px] bg-input">
          <i className="text-button-foreground ">
            <CalendarIcon />
          </i>
          <SelectValue placeholder="Filtrar pelo ano de referência" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {YEARS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleChangeSemester} value={semester ?? ""}>
        <SelectTrigger className="w-full max-w-[360px] bg-input">
          <i className="text-button-foreground ">
            <CalendarDotsIcon />
          </i>
          <SelectValue placeholder="Filtrar pelo semestre de referência" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {SEMESTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        onClick={handleClearFilters}
        className="h-[50px]"
        type="button"
      >
        <BroomIcon />
      </Button>
    </form>
  );
}
