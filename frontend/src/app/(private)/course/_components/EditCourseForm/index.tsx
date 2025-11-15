"use client";

import { UpdateCourseDto } from "@unidash/api/dtos/course.dto";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCSService } from "@unidash/services/course/course.cs.service";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Toast } from "@unidash/utils/toast.util";
import { CourseForm } from "../CourseForm";
import { EditCourseFormProps } from "./editCourseForm.interface";

const EDIT_COURSE_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar essa operação",
  [HTTP_STATUS.badRequest]: "Ocorreu um erro ao atualiza o curso",
} as const;

const EDIT_COURSE_SUCCESS_MESSAGE = "Curso atualizado com sucesso!";

export function EditCourseForm({ course }: EditCourseFormProps) {
  const router = useRouter();

  const formMethods = useForm<UpdateCourseDto>({
    defaultValues: {
      name: course.name,
    },
  });

  const { handleSubmit } = formMethods;

  async function registerCourse(updateCourseDto: UpdateCourseDto) {
    try {
      await CourseCSService.update(course.id, updateCourseDto);

      Toast.success(EDIT_COURSE_SUCCESS_MESSAGE);

      router.push(APP_ROUTES.private.courses);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: EDIT_COURSE_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(registerCourse)}>
        <CourseForm title="Atualizar curso" />
      </form>
    </FormProvider>
  );
}
