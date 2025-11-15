"use client";

import {
  UpdateTeacherDto,
  updateTeacherDtoSchema,
} from "@unidash/api/dtos/teacher.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { Toast } from "@unidash/utils/toast.util";
import { TeacherCSService } from "@unidash/services/teacher/teacher.cs.service";
import { FormProvider, useForm } from "react-hook-form";
import { EditTeacherFormProps } from "./editTeacherForm.interface";
import {
  EDIT_TEACHER_ERROR_MESSAGES,
  EDIT_TEACHER_SUCCESS_MESSAGE,
} from "@unidash/api/messages/editTeacher.message";
import {
  Card,
  CardContent,
  CardHeader,
  CardInputsRow,
  CardTitle,
} from "@unidash/components/Card";
import { FormInput } from "@unidash/components/FormInput";
import { Button } from "@unidash/components/Button";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr";
import { FormSwitch } from "@unidash/components/FormSwitch";
import { Input } from "@unidash/components/Input";
import { Label } from "@unidash/components/Label";

export function EditTeacherForm({ teacher }: EditTeacherFormProps) {
  const formMethods = useForm<UpdateTeacherDto>({
    resolver: zodResolver(updateTeacherDtoSchema),
    defaultValues: {
      name: teacher.name,
      isActive: teacher.isActive,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function editTeacher(editTeacherDto: UpdateTeacherDto) {
    try {
      await TeacherCSService.updateForAdmin(teacher.id, editTeacherDto);

      Toast.success(EDIT_TEACHER_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: EDIT_TEACHER_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(editTeacher)}>
        <Card>
          <CardHeader>
            <CardTitle>Editar docente</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <CardInputsRow>
              <FormInput
                control={control}
                name="name"
                placeholder="Digite o nome do docente"
                label="Nome"
                helper={errors.name?.message}
              />

              <Label className="flex flex-col items-start w-full">
                E-mail
                <Input
                  value={teacher.email}
                  type="email"
                  placeholder="Digite o email do docente"
                  disabled
                />
              </Label>
            </CardInputsRow>

            <FormSwitch
              name="isActive"
              control={control}
              description="Indica se o docente está atualmente em atividade na universidade."
              label="Docente ativo"
            />

            <Button className="max-w-56" size="lg" isLoading={isSubmitting}>
              <FloppyDiskIcon />
              Atualizar docente
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
