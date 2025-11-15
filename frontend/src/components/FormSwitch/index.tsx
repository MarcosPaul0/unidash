import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../Form";
import { Switch } from "../Switch";
import { FormSwitchProps } from "./formSwitch.interface";

export function FormSwitch({
  control,
  name,
  label,
  description,
}: FormSwitchProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border-input p-3">
          <div className="space-y-1">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>

          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
