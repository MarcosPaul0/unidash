"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterStudentDto,
  registerStudentDtoSchema,
} from "@unidash/api/dtos/student.dto";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { StudentCSService } from "@unidash/services/student/student.cs.service";
import { useCourseStore } from "@unidash/store/course.store";
import { useRouter } from "next/navigation";
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
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const REGISTER_STUDENT_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar o aluno!",
  [HTTP_STATUS.conflict]:
    "Esse usuário já foi registrado! Verifique a matrícula e o e-mail enviado.",
} as const;

export const REGISTER_STUDENT_SUCCESS_MESSAGE = "Aluno registrado com sucesso!";

export function RegisterStudentForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterStudentDto>({
    defaultValues: {
      name: "",
      email: "",
      matriculation: "",
      password: "",
      passwordConfirmation: "",
      type: "incomingStudent",
    },
    resolver: zodResolver(registerStudentDtoSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function registerStudent(registerStudentDto: RegisterStudentDto) {
    try {
      if (!activeCourse) {
        Toast.error("É necessário selecionar o curso para registrar o aluno!");
        return;
      }

      await StudentCSService.register(activeCourse.id, registerStudentDto);

      Toast.success(REGISTER_STUDENT_SUCCESS_MESSAGE);

      router.push(`${APP_ROUTES.private.student}${activeCourse.id}`);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_STUDENT_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(registerStudent)}>
        <Card>
          <CardHeader>
            <CardTitle>Registrar novo aluno de {activeCourse?.name}</CardTitle>
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
              <FormInput
                control={control}
                name="email"
                type="email"
                placeholder="Digite o email do aluno"
                label="E-mail"
                helper={errors.email?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                name="password"
                type="password"
                placeholder="Defina uma senha para o aluno"
                label="Senha"
                helper={errors.password?.message}
              />
              <FormInput
                control={control}
                name="passwordConfirmation"
                type="password"
                placeholder="Confirme a senha para o aluno"
                label="Confirmar senha"
                helper={errors.passwordConfirmation?.message}
              />
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
              Registrar aluno
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
