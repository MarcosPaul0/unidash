"use client";

import { RegisterCourseDto } from "@unidash/api/dtos/course.dto";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { CourseCSService } from "@unidash/services/course/course.cs.service";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Toast } from "@unidash/utils/toast.util";
import { CourseForm } from "../CourseForm";

const REGISTER_COURSE_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]: "Você não tem permissão para realizar essa operação",
  [HTTP_STATUS.conflict]: "Esse curso já está cadastrado",
} as const;

const REGISTER_COURSE_SUCCESS_MESSAGE = "Curso cadastrado com sucesso";

export function RegisterCourseForm() {
  const router = useRouter();

  const formMethods = useForm<RegisterCourseDto>({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = formMethods;

  async function registerCourse(registerCourseDto: RegisterCourseDto) {
    try {
      await CourseCSService.register(registerCourseDto);

      Toast.success(REGISTER_COURSE_SUCCESS_MESSAGE);

      router.push(APP_ROUTES.private.courses);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(registerCourse)}>
        <CourseForm title="Registrar novo curso" />
      </form>
    </FormProvider>
  );
}
