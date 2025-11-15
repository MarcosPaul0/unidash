import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="font-title text-4xl">Recuperar acesso!</h1>

        <p className="text-lg">
          Informe o e-mail associado à sua conta para receber instruções de
          redefinição de senha. Enviaremos um link para que você possa criar uma
          nova senha com segurança.
        </p>
      </div>

      <ForgotPasswordForm />
    </>
  );
}
