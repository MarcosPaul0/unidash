"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordIcon } from "@phosphor-icons/react/dist/ssr";
import {
  RecoverPasswordDto,
  recoverPasswordDtoSchema,
} from "@unidash/api/dtos/recoverPassword.dto";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { Button } from "@unidash/components/Button";
import { Form } from "@unidash/components/Form";
import { FormInput } from "@unidash/components/FormInput";
import { LinkButton } from "@unidash/components/LinkButton";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { AuthCSService } from "@unidash/services/auth/auth.cs.service";
import { Toast } from "@unidash/utils/toast.util";
import { useForm } from "react-hook-form";
import { RecoverPasswordFormProps } from "./recoverPasswordForm.interface";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  newPassword: "",
  passwordConfirmation: "",
} as unknown as RecoverPasswordDto;

const RECOVER_PASSWORD_SUCCESS_MESSAGE = "A senha foi alterada com sucesso";

const RECOVER_PASSWORD_ERROR_MESSAGES = {
  [HTTP_STATUS.notFound]: "Não foi possível redefinir a senha!",
  [HTTP_STATUS.badRequest]: "Não foi possível redefinir a senha!",
} as const;

export function RecoverPasswordForm({
  recoverPasswordToken,
}: RecoverPasswordFormProps) {
  const router = useRouter();

  const formMethods = useForm({
    resolver: zodResolver(recoverPasswordDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendRecoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    try {
      await AuthCSService.recoverPassword(
        recoverPasswordToken,
        recoverPasswordDto
      );

      Toast.success(RECOVER_PASSWORD_SUCCESS_MESSAGE);

      router.push(APP_ROUTES.public.login);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: RECOVER_PASSWORD_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <Form {...formMethods}>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(sendRecoverPassword)}
      >
        <FormInput
          label="Nova senha"
          type="password"
          control={control}
          name="newPassword"
          helper={errors.newPassword?.message}
        />

        <FormInput
          label="Corfirme sua nova senha"
          type="password"
          control={control}
          name="passwordConfirmation"
          helper={errors.passwordConfirmation?.message}
        />

        <span className="flex items-center gap-2">
          Lembrou sua senha?
          <LinkButton href={APP_ROUTES.public.login}>Entrar</LinkButton>
        </span>

        <Button size="lg" isLoading={isSubmitting}>
          <PasswordIcon weight="bold" /> Definir nova senha
        </Button>
      </form>
    </Form>
  );
}
