import { HTTP_STATUS } from "@unidash/lib/baseApiClient";

export const SET_TEACHER_COURSE_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar esta ação.",
  [HTTP_STATUS.notFound]:
    "Não foi possível encontrar o docente ou o curso informado.",
  [HTTP_STATUS.badRequest]: "Não foi possível vincular o docente ao curso.",
};

export const SET_TEACHER_COURSE_SUCCESS_MESSAGE = {
  addTeacherToCourse: "O docente foi adicionado ao curso!",
  updateTeacherRole: "O papel do docente foi atualizado!",
} as const;
