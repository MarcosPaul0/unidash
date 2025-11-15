import { SEMESTER } from "@unidash/api/dtos/courseStudentsData.dto";
import { CardInputsRow } from "@unidash/components/Card";
import { FormSelect } from "@unidash/components/FormSelect";
import { useFormContext } from "react-hook-form";

const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();
const YEARS_OPTIONS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 })
  .map((_, index) => ({
    label: String(MIN_YEAR + index),
    value: String(MIN_YEAR + index),
  }))
  .reverse();

export function PeriodForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <CardInputsRow>
      <FormSelect
        control={control}
        type="number"
        name="year"
        placeholder="Ano de referência"
        label="Ano"
        helper={errors.year?.message as string | undefined}
        options={YEARS_OPTIONS}
      />

      <FormSelect
        control={control}
        name="semester"
        placeholder="Seleciona o semestre"
        label="Semestre"
        options={[
          { label: "Primeiro semestre", value: SEMESTER.first },
          { label: "Segundo semestre", value: SEMESTER.second },
        ]}
        helper={errors.semester?.message as string | undefined}
      />
    </CardInputsRow>
  );
}
