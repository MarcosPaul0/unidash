import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form";
import { Textarea } from "../Textarea";
import { FormTextareaProps } from "./formTextarea.interface";

export function FormTextarea({
  label,
  helper,
  name,
  control,
  ...rest
}: FormTextareaProps) {
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

          <FormControl>
            <Textarea {...rest} {...field} />
          </FormControl>

          {helper && <FormMessage>{helper}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
