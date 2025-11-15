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
import { DeleteTeacherCourseDialogProps } from "./deleteTeacherCourseDialog.interface";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@unidash/utils/toast.util";
import { TeacherCourseCSService } from "@unidash/services/teacherCourse/teacherCourse.cs.service";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";

const DELETE_TEACHER_COURSE_SUCCESS_MESSAGE =
  "O docente foi excluído do curso!";

export function DeleteTeacherCourseDialog({
  teacherCourseId,
}: DeleteTeacherCourseDialogProps) {
  const router = useRouter();

  async function handleDeleteCourse(event: FormEvent) {
    event.preventDefault();

    await TeacherCourseCSService.delete(teacherCourseId);

    Toast.success(DELETE_TEACHER_COURSE_SUCCESS_MESSAGE);

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

        <TooltipContent>Remover docente do curso</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteCourse}>
          <DialogHeader>
            <DialogTitle>Excluir docente do curso</DialogTitle>

            <DialogDescription>
              Você tem certeza que deseja excluir o docente do curso?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" variant="destructive">
              Sim, excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
