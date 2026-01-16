import { RecoverPasswordForm } from "./_components/RecoverPasswordForm";

interface RecoverPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default async function RecoverPasswordPage({
  params,
}: RecoverPasswordPageProps) {
  const { token } = await params;

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="font-title text-4xl">Definir nova senha</h1>

        <p className="text-lg">
          Crie uma nova senha para sua conta. Escolha uma combinação segura e
          fácil de lembrar. Após salvar, você poderá acessar normalmente com a
          nova senha.
        </p>
      </div>

      <RecoverPasswordForm recoverPasswordToken={token} />
    </>
  );
}
