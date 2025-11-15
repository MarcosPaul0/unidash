import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { useFormContext } from "react-hook-form";
import { CourseFormProps } from "./courseForm.interface";
import { FormInput } from "@unidash/components/FormInput";
import { Button } from "@unidash/components/Button";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr";
import { RegisterCourseDto } from "@unidash/api/dtos/course.dto";

export function CourseForm({ title }: CourseFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<RegisterCourseDto>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 md:gap-8">
        <FormInput
          control={control}
          name="name"
          placeholder="Digite o nome do curso"
          label="Nome do curso"
          helper={errors.name?.message}
        />
        {/* <div className="flex gap-8 w-full">
          <FormSelect
              control={control}
              name="status"
              placeholder="Selecione um status para o curso"
              label="Status do docente"
              defaultValue={TEACHER_STATUS.active}
              options={[
                { label: "Ativo", value: COURSE_STATUS.active },
                { label: "Inativo", value: COURSE_STATUS.inactive },
              ]}
            />
        </div> */}
      </CardContent>

      <CardFooter>
        <Button
          className="max-w-80 w-full"
          size="lg"
          type="submit"
          isLoading={isSubmitting}
        >
          <FloppyDiskIcon />
          Enviar
        </Button>
      </CardFooter>
    </Card>
  );
}
