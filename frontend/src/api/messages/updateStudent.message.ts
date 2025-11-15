import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const UPDATE_STUDENT_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar o aluno!",
  [HTTP_STATUS.notFound]: "Aluno não encontrado",
} as const;

export const UPDATE_STUDENT_SUCCESS_MESSAGE = "Aluno atualizado com sucesso!";
