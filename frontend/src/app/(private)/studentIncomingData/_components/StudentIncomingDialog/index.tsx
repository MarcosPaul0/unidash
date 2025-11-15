"use client";

import { ArrowBendUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@unidash/components/Dialog";
import { LinkButton } from "@unidash/components/LinkButton";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { StudentIncomingDataCSService } from "@unidash/services/studentIncomingData/studentIncomingData.cs.service";
import { useAuthStore } from "@unidash/store/auth.store";
import { useEffect, useState } from "react";

export function StudentIncomingDialog() {
  const { session } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const checkIncomingStudentRespondedResponse =
          await StudentIncomingDataCSService.checkIncomingStudentResponded();

        setIsOpen(!checkIncomingStudentRespondedResponse.wasAnswered);
      } catch {
        setIsOpen(false);
      }
    })();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="mb-4">
            Bem-vindo(a), {session?.name}!
          </DialogTitle>

          <DialogDescription>
            Queremos acompanhar sua trajetória desde o primeiro dia. Por isso,
            pedimos que você responda à Pesquisa de Ingressante. Ela é rápida e
            vai nos ajudar a entender melhor o perfil dos novos estudantes.
          </DialogDescription>

          <DialogDescription>
            Com suas respostas, poderemos aprimorar o curso, oferecer suporte
            personalizado e criar ações que façam diferença na sua experiência
            universitária.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <LinkButton
            href={APP_ROUTES.private.registerStudentIncomingData}
            variant="filled"
            size="md"
          >
            <ArrowBendUpRightIcon />
            Preencher agora
          </LinkButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
