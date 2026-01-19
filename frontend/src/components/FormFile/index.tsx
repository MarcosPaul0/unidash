import { FilePdfIcon, UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardFooter } from "../Card";
import { FormFileProps } from "./formFile.interface";
import { useDropzone } from "react-dropzone";

export function FormFile({ helper, label, ...rest }: FormFileProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(rest);

  return (
    <Card
      className={`
        flex flex-col py-4 border 
        border-dashed gap-1 border-muted rounded-2xl
        pb-1 ${isDragActive && "border-solid border-primary bg-primary/10"}
      `}
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} hidden />

      <CardContent className="flex flex-col items-center">
        {isDragActive ? (
          <FilePdfIcon size={62} />
        ) : (
          <UploadSimpleIcon size={62} />
        )}

        {label}
      </CardContent>

      <CardFooter>{helper}</CardFooter>
    </Card>
  );
}
