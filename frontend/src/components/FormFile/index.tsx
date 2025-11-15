import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardFooter } from "../Card";
import { Button } from "../Button";
import { FormFileProps } from "./formFile.interface";

export function FormFile({ helper, label }: FormFileProps) {
  return (
    <Card
      className={`
        flex flex-col py-4 border 
        border-dashed gap-1 border-muted rounded-2xl
        pb-1
      `}
    >
      <CardContent className="flex flex-col items-center">
        <UploadSimpleIcon size={62} />

        <span>{label}</span>

        <Button variant="link" type="button">
          Clique para baixar um template
        </Button>
      </CardContent>

      <CardFooter>{helper}</CardFooter>
    </Card>
  );
}
