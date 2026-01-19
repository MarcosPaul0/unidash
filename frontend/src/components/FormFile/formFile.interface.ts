import { ReactNode } from "react";
import { DropzoneOptions } from "react-dropzone";
import { Control } from "react-hook-form";

export interface FormFileProps extends DropzoneOptions {
  label: ReactNode;
  helper?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>;
  name: string;
}
