"use client";

import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { AuthDto, authDtoSchema } from "@unidash/api/dtos/auth.dto";
import { Button } from "@unidash/components/Button";
import { Form } from "@unidash/components/Form";
import { FormInput } from "@unidash/components/FormInput";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { Toast } from "@unidash/utils/toast.util";
import { COOKIES, Cookies } from "../../../../../lib/cookies";
import { JwtDecode } from "@unidash/lib/jwtDecode";
import { useAuthStore } from "@unidash/store/auth.store";
import { apiClient } from "@unidash/lib/apiClient";
import { useRouter } from "next/navigation";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { AuthCSService } from "@unidash/services/auth/auth.cs.service";

const SIGN_IN_ERROR_MESSAGES = {
  [HTTP_STATUS.unauthorized]: "Email ou senha inválida",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao logar",
} as const;

export function LoginForm() {
  const { setSession } = useAuthStore();

  const router = useRouter();

  const formMethods = useForm<AuthDto>({
    resolver: zodResolver(authDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  async function signIn(authDto: AuthDto) {
    try {
      const authResponse = await AuthCSService.auth(authDto);

      Cookies.set(COOKIES.token, authResponse.accessToken);
      apiClient.setAuthorizationWithBearerToken(authResponse.accessToken);

      const tokenDecoded = JwtDecode.decode(authResponse.accessToken);

      if (!tokenDecoded) {
        return;
      }

      const userResponse = await AuthCSService.getSessionByRole(
        tokenDecoded.userRole
      );

      setSession(userResponse.session, userResponse.teacherCourses);

      router.push(APP_ROUTES.private.dashboard);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: SIGN_IN_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-8">
        <FormInput
          label="E-mail"
          type="email"
          control={control}
          name="email"
          placeholder="unifei@unifei.edu.br"
        />

        <FormInput
          label="Senha"
          type="password"
          control={control}
          name="password"
        />

        <span className="flex items-center gap-2">
          Esqueceu sua senha?
          <LinkButton href={APP_ROUTES.public.forgotPassword}>
            Recuperar
          </LinkButton>
        </span>

        <Button isLoading={isSubmitting} size="lg">
          <SignInIcon weight="bold" /> Entrar
        </Button>
      </form>
    </Form>
  );
}
