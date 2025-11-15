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
import { DeleteStudentDialogProps } from "./deleteStudentDialog.interface";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@unidash/utils/toast.util";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { StudentCSService } from "@unidash/services/student/student.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import {
  DELETE_STUDENT_ERROR_MESSAGES,
  DELETE_STUDENT_SUCCESS_MESSAGE,
} from "@unidash/api/messages/deleteStudent.message";

export function DeleteStudentDialog({ studentId }: DeleteStudentDialogProps) {
  const router = useRouter();

  async function handleDeleteCourse(event: FormEvent) {
    try {
      event.preventDefault();

      await StudentCSService.delete(studentId);

      Toast.success(DELETE_STUDENT_SUCCESS_MESSAGE);

      router.refresh();
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: DELETE_STUDENT_ERROR_MESSAGES,
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

        <TooltipContent>Excluir aluno</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteCourse}>
          <DialogHeader>
            <DialogTitle>Remover Aluno</DialogTitle>

            <DialogDescription>
              Você tem certeza que deseja excluir o aluno? Essa é uma ação
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
