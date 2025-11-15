"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateStudentDto,
  updateStudentDtoSchema,
} from "@unidash/api/dtos/student.dto";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { StudentCSService } from "@unidash/services/student/student.cs.service";
import { FormProvider, useForm } from "react-hook-form";
import { Toast } from "@unidash/utils/toast.util";
import {
  Card,
  CardContent,
  CardHeader,
  CardInputsRow,
  CardTitle,
} from "@unidash/components/Card";
import { Button } from "@unidash/components/Button";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { FormInput } from "@unidash/components/FormInput";
import { STUDENT_TYPE } from "@unidash/api/responses/student.response";
import { FormSelect } from "@unidash/components/FormSelect";
import {
  UPDATE_STUDENT_ERROR_MESSAGES,
  UPDATE_STUDENT_SUCCESS_MESSAGE,
} from "@unidash/api/messages/updateStudent.message";
import { Label } from "@unidash/components/Label";
import { Input } from "@unidash/components/Input";
import { EditStudentFormProps } from "./editStudentForm.interface";

export function EditStudentForm({ student }: EditStudentFormProps) {
  const formMethods = useForm<UpdateStudentDto>({
    defaultValues: {
      name: student.name,
      matriculation: student.matriculation,
      type: student.type,
    },
    resolver: zodResolver(updateStudentDtoSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function updateStudent(updateStudentDto: UpdateStudentDto) {
    try {
      await StudentCSService.update(student.id, updateStudentDto);

      Toast.success(UPDATE_STUDENT_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_STUDENT_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(updateStudent)}>
        <Card>
          <CardHeader>
            <CardTitle>Registrar novo aluno</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <CardInputsRow>
              <FormInput
                control={control}
                name="name"
                placeholder="Digite o nome do aluno"
                label="Nome"
                helper={errors.name?.message}
              />
              <Label className="flex flex-col items-start w-full">
                E-mail
                <Input
                  value={student.email}
                  type="email"
                  placeholder="Digite o email do docente"
                  disabled
                />
              </Label>
            </CardInputsRow>

            <CardInputsRow>
              <FormSelect
                control={control}
                name="type"
                placeholder="Seleciona o tipo de aluno"
                label="Tipo de aluno"
                options={[
                  { label: "Ingressante", value: STUDENT_TYPE.incomingStudent },
                  { label: "Egressante", value: STUDENT_TYPE.outgoingStudent },
                ]}
                helper={errors.type?.message}
              />
              <FormInput
                control={control}
                name="matriculation"
                placeholder="Informe a matrícula do aluno"
                label="Matrícula"
                helper={errors.matriculation?.message}
              />
            </CardInputsRow>

            <Button className="max-w-56" size="lg" isLoading={isSubmitting}>
              <PaperPlaneTiltIcon />
              Atualizar aluno
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
