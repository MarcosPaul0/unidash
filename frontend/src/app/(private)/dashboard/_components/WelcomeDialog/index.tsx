"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@unidash/components/Dialog";
import { useAuthStore } from "@unidash/store/auth.store";
import { useEffect, useState } from "react";

const WELCOME_DIALOG_STORAGE_ITEM = "unidash:welcome";

export function WelcomeDialog() {
  const { session } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialogueHasAlreadyDisplayed = localStorage.getItem(
      WELCOME_DIALOG_STORAGE_ITEM
    );

    if (!dialogueHasAlreadyDisplayed) {
      localStorage.setItem(WELCOME_DIALOG_STORAGE_ITEM, "true");
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-4">
            Bem-vindo(a), {session?.name}! 👋
          </DialogTitle>

          <DialogDescription>
            Você está acessando ao Unidash (MVP), uma versão inicial do sistema.
          </DialogDescription>

          <DialogDescription>
            Este MVP foi construído a partir das primeiras informações
            levantadas e da pesquisa aplicada recentemente com gestores do
            curso. A pesquisa será de grande importância para a evolução do
            sistema, as respostas estão sendo consideradas como base para novas
            funcionalidades e melhorias. No entanto, ainda não foi possível
            implementar todos os pontos levantados.
          </DialogDescription>

          <DialogDescription>
            No momento, a maioria das funcionalidades depende de entrada manual
            de dados, mas já estão previstas melhorias como a integração com o
            SIGAA, a importação de planilhas e documentos e a inclusão de novos
            indicadores sugeridos na pesquisa.
          </DialogDescription>

          <DialogDescription>
            A intenção deste teste é validar se o sistema tem potencial para ser
            utilizado na universidade e apoiar o trabalho dos coordenadores. Com
            mais tempo disponível no futuro, serão implementadas melhorias
            significativas.
          </DialogDescription>

          <DialogDescription>
            Seu uso e feedback são fundamentais para orientar os próximos
            passos. 🚀
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
