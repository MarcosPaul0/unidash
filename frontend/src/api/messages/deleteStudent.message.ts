import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const DELETE_STUDENT_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar esta ação.",
  [HTTP_STATUS.notFound]: "Não foi possível encontrar o aluno informado.",
  [HTTP_STATUS.badRequest]: "Não foi excluir o aluno.",
};

export const DELETE_STUDENT_SUCCESS_MESSAGE = "Aluno removido!";
