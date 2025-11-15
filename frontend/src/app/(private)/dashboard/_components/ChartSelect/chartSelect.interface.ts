import { SelectOption } from "@unidash/components/FormSelect/formSelect.interface";

export interface ChartSelectProps {
  onChange: (value: string) => void;
  value: string | null;
  options: SelectOption[];
}
