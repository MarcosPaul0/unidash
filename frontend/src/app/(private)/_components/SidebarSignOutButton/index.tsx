"use client";

import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@unidash/components/Button";
import { COOKIES, Cookies } from "@unidash/lib/cookies";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { useAuthStore } from "@unidash/store/auth.store";
import { useRouter } from "next/navigation";

export function SidebarSignOutButton() {
  const { clearSession } = useAuthStore();

  const router = useRouter();

  async function handleSignOut() {
    try {
      Cookies.remove(COOKIES.refreshToken);
      Cookies.remove(COOKIES.token);

      clearSession();

      router.push(APP_ROUTES.public.login);
    } catch {
      router.push(APP_ROUTES.public.login);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleSignOut}
      className={`
        p-4 h-auto rounded-2xl justify-start text-destructive
        bg-accent hover:bg-menu-foreground
      `}
    >
      <SignOutIcon size={24} />
      Sair
    </Button>
  );
}
