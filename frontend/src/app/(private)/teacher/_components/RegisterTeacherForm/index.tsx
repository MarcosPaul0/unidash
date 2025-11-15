"use client";

import { APP_ROUTES } from "@unidash/routes/app.routes";
import {
  RegisterTeacherDto,
  registerTeacherDtoSchema,
} from "@unidash/api/dtos/teacher.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { Toast } from "@unidash/utils/toast.util";
import { TeacherCSService } from "@unidash/services/teacher/teacher.cs.service";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
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

const REGISTER_TEACHER_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar essa operação",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar o novo docente",
  [HTTP_STATUS.conflict]: "Já existe um usuário registrado com esse e-mail",
} as const;

export function RegisterTeacherForm() {
  const router = useRouter();

  const formMethods = useForm<RegisterTeacherDto>({
    resolver: zodResolver(registerTeacherDtoSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function registerTeacher(registerTeacherDto: RegisterTeacherDto) {
    try {
      await TeacherCSService.register(registerTeacherDto);

      Toast.success("Docente cadastrado com sucesso");

      router.push(APP_ROUTES.private.teachers);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_TEACHER_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(registerTeacher)}>
        <Card>
          <CardHeader>
            <CardTitle>Registro de docente</CardTitle>
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
              <FormInput
                control={control}
                name="email"
                type="email"
                placeholder="Digite o email do docente"
                label="E-mail"
                helper={errors.email?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                name="password"
                type="password"
                placeholder="Defina uma senha para o docente"
                label="Senha"
                helper={errors.password?.message}
              />
              <FormInput
                control={control}
                name="passwordConfirmation"
                type="password"
                placeholder="Confirme a senha para o docente"
                label="Confirmar senha"
                helper={errors.passwordConfirmation?.message}
              />
            </CardInputsRow>

            <Button className="max-w-56" size="lg" isLoading={isSubmitting}>
              <FloppyDiskIcon />
              Cadastrar docente
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
