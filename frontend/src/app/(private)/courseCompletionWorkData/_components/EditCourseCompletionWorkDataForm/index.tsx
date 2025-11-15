"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardInputsRow,
  CardTitle,
} from "@unidash/components/Card";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@unidash/components/FormInput";
import { Button } from "@unidash/components/Button";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr";
import {
  RegisterCourseCompletionWorkDataDto,
  courseCompletionWorkDataDtoSchema,
} from "@unidash/api/dtos/courseCompletionWorkData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseCompletionWorkDataCSService } from "@unidash/services/courseCompletionWorkData/courseCompletionWorkData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { EditCourseCompletionWorkDataFormProps } from "./editCourseCompletionWorkDataForm.interface";

const UPDATE_COURSE_COMPLETION_WORK_DATA_SUCCESS_MESSAGE =
  "Registro de TCCs do curso foi atualizado!";

const UPDATE_COURSE_COMPLETION_WORK_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "Registro de TCC informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar as informações!",
} as const;

export function EditCourseCompletionWorkDataForm({
  courseCompletionWorkData,
}: EditCourseCompletionWorkDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<RegisterCourseCompletionWorkDataDto>({
    resolver: zodResolver(courseCompletionWorkDataDtoSchema),
    defaultValues: {
      abandonments: courseCompletionWorkData.abandonments,
      defenses: courseCompletionWorkData.defenses,
      enrollments: courseCompletionWorkData.enrollments,
      semester: courseCompletionWorkData.semester,
      year: String(courseCompletionWorkData.year) as unknown as number,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseCompletionWorkData(
    registerCourseCompletionWorkDataDto: RegisterCourseCompletionWorkDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseCompletionWorkDataCSService.update(
        courseCompletionWorkData.id,
        registerCourseCompletionWorkDataDto
      );

      Toast.success(UPDATE_COURSE_COMPLETION_WORK_DATA_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_COURSE_COMPLETION_WORK_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseCompletionWorkData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize o registro de informações de TCCs do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="enrollments"
                placeholder="Quantidade de matrículas"
                label="Matrículas"
                helper={errors.enrollments?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="defenses"
                placeholder="Quantidade de defeses"
                label="Defesas"
                helper={errors.defenses?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="abandonments"
                placeholder="Quantidade de abandonos"
                label="Abandonos"
                helper={errors.abandonments?.message}
              />
            </CardInputsRow>
          </CardContent>

          <CardFooter className="gap-6">
            <Button
              className="w-full max-w-80"
              size="lg"
              isLoading={isSubmitting}
            >
              <FloppyDiskIcon />
              Atualizar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
