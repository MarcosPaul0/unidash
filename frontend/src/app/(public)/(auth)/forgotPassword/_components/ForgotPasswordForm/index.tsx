"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import {
  ForgotPasswordDto,
  forgotPasswordDtoSchema,
} from "@unidash/api/dtos/forgotPassword.dto";
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

const INITIAL_VALUES = {
  email: "",
} as unknown as ForgotPasswordDto;

const FORGOT_PASSWORD_SUCCESS_MESSAGE =
  "Enviamos um email de recuperação de conta. Verifique sua caixa de entrada!";

const FORGOT_PASSWORD_ERROR_MESSAGES = {
  [HTTP_STATUS.notFound]: "Email inválido!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao recuperar a conta!",
} as const;

export function ForgotPasswordForm() {
  const formMethods = useForm({
    resolver: zodResolver(forgotPasswordDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendForgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      await AuthCSService.forgotPassword(forgotPasswordDto);

      Toast.success(FORGOT_PASSWORD_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: FORGOT_PASSWORD_ERROR_MESSAGES,
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
        onSubmit={handleSubmit(sendForgotPassword)}
      >
        <FormInput
          label="E-mail"
          type="email"
          control={control}
          name="email"
          placeholder="unifei@unifei.edu.br"
          helper={errors.email?.message}
        />

        <span className="flex items-center gap-2">
          Lembrou sua senha?
          <LinkButton href={APP_ROUTES.public.login}>Entrar</LinkButton>
        </span>

        <Button size="lg" isLoading={isSubmitting}>
          <PaperPlaneTiltIcon weight="bold" /> Recuperar senha
        </Button>
      </form>
    </Form>
  );
}
