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
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@unidash/utils/toast.util";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { DeleteCourseCoordinationDataDialogProps } from "./deleteCourseCoordinationDataDialog.interface";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { CourseCoordinationDataCSService } from "@unidash/services/courseCoordinationData/courseCoordinationData.cs.service";

const DELETE_COURSE_COORDINATION_DATA_SUCCESS_MESSAGE =
  "Registro de dados da coordenação do curso removido!";

const DELETE_COURSE_COORDINATION_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar esta ação!",
  [HTTP_STATUS.notFound]: "Não foi possível encontrar o registro informado!",
  [HTTP_STATUS.badRequest]:
    "Não foi possível excluir o registro da coordenação do curso!",
};

export function DeleteCourseCoordinationDataDialog({
  courseCoordinationDataId,
}: DeleteCourseCoordinationDataDialogProps) {
  const router = useRouter();

  async function handleDeleteCourse(event: FormEvent) {
    try {
      event.preventDefault();

      await CourseCoordinationDataCSService.delete(courseCoordinationDataId);

      Toast.success(DELETE_COURSE_COORDINATION_DATA_SUCCESS_MESSAGE);

      router.refresh();
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: DELETE_COURSE_COORDINATION_DATA_ERROR_MESSAGES,
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

        <TooltipContent>
          Excluir registro da coordenação do curso
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDeleteCourse}>
          <DialogHeader>
            <DialogTitle>Remover Aluno</DialogTitle>

            <DialogDescription>
              Você tem certeza que deseja excluir o registro da coordenação do
              curso? Essa é uma ação irreverssível.
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
