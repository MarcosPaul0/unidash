"use client";

import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@unidash/components/Button";
import { Form } from "@unidash/components/Form";
import { FormInput } from "@unidash/components/FormInput";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const formMethods = useForm();

  const { control } = formMethods;

  return (
    <Form {...formMethods}>
      <form className="flex flex-col gap-8">
        <FormInput
          label="E-mail"
          type="email"
          control={control}
          name="email"
          placeholder="unifei@unifei.edu.br"
        />

        <span className="flex items-center gap-2">
          Lembrou sua senha?
          <LinkButton href={APP_ROUTES.public.login}>Entrar</LinkButton>
        </span>

        <Button size="lg">
          <PaperPlaneTiltIcon weight="bold" /> Recuperar senha
        </Button>
      </form>
    </Form>
  );
}
