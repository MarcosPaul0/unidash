"use client";

import { TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@unidash/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@unidash/components/Dialog";
import { DeleteTeacherDialogProps } from "./deleteTeacherDialog.interface";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@unidash/utils/toast.util";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { TeacherCSService } from "@unidash/services/teacher/teacher.cs.service";
import {
  DELETE_TEACHER_ERROR_MESSAGES,
  DELETE_TEACHER_SUCCESS_MESSAGE,
} from "@unidash/api/messages/deleteTeacher.message";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";

export function DeleteTeacherDialog({ teacherId }: DeleteTeacherDialogProps) {
  const router = useRouter();

  async function handleDeleteTeacher(event: FormEvent) {
    try {
      event.preventDefault();

      await TeacherCSService.delete(teacherId);

      Toast.success(DELETE_TEACHER_SUCCESS_MESSAGE);

      router.refresh();
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: DELETE_TEACHER_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" type="button" className="ml-1">
              <TrashIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>Excluir docente</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteTeacher}>
          <DialogHeader>
            <DialogTitle>Excluir docente</DialogTitle>

            <DialogDescription>
              Você tem certeza que deseja excluir o docente? Essa é uma ação
              irreverssível.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" variant="destructive">
              Sim, remover
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
