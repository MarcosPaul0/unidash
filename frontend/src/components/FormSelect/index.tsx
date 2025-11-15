import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../Select";
import { FormSelectProps } from "./formSelect.interface";

export function FormSelect({
  icon,
  label,
  options,
  helper,
  name,
  control,
  ...rest
}: FormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}

              {rest.required && <span className="text-primary">*</span>}
            </FormLabel>
          )}

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                {icon && (
                  <i className="text-button-foreground size-6">{icon}</i>
                )}

                <SelectValue className="" {...rest} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                {label && <SelectLabel>{label}</SelectLabel>}

                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {helper && <FormMessage>{helper}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
