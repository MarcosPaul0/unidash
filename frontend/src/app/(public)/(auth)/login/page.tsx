import { LoginForm } from "./_components/LoginForm";

export default async function LoginPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="font-title text-4xl">Bem-vindo de volta!</h1>

        <p className="text-lg">
          Para continuar conectado conosco, por favor, faça login com suas
          informações pessoais.
        </p>
      </div>

      <LoginForm />
    </>
  );
}
