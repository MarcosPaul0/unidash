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
import { DeleteCourseDialogProps } from "./deleteCourseDialog.interface";
import { FormEvent } from "react";
import { CourseCSService } from "@unidash/services/course/course.cs.service";
import { useRouter } from "next/navigation";
import { Toast } from "@unidash/utils/toast.util";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";

const DELETE_COURSE_SUCCESS_MESSAGE = "Courso removido com sucesso!";

export function DeleteCourseDialog({ courseId }: DeleteCourseDialogProps) {
  const router = useRouter();

  async function handleDeleteCourse(event: FormEvent) {
    event.preventDefault();

    await CourseCSService.delete(courseId);

    Toast.success(DELETE_COURSE_SUCCESS_MESSAGE);

    router.refresh();
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

        <TooltipContent>Excluir curso</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteCourse}>
          <DialogHeader>
            <DialogTitle>Remover curso</DialogTitle>

            <DialogDescription>
              Você tem certeza que deseja deletar o curso? Essa é uma ação
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
