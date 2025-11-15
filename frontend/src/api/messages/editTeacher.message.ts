import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const EDIT_TEACHER_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar o docente!",
  [HTTP_STATUS.notFound]: "O docente não foi encontrado!",
} as const;

export const EDIT_TEACHER_SUCCESS_MESSAGE = "Docente atualizado!";
