import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const DELETE_TEACHER_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar esta ação.",
  [HTTP_STATUS.notFound]: "Não foi possível encontrar o docente informado.",
  [HTTP_STATUS.badRequest]: "Não foi excluir o docente.",
};

export const DELETE_TEACHER_SUCCESS_MESSAGE = "O docente foi excluído!";
