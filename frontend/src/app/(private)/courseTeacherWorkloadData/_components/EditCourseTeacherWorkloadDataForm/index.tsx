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
  RegisterCourseTeacherWorkloadDataDto,
  courseTeacherWorkloadDataDtoSchema,
} from "@unidash/api/dtos/courseTeacherWorkloadData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseTeacherWorkloadDataCSService } from "@unidash/services/courseTeacherWorkloadData/courseTeacherWorkloadData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { FormSelect } from "@unidash/components/FormSelect";
import { EditCourseTeacherWorkloadDataFormProps } from "./editCourseTeacherWorkloadDataForm.interface";

const UPDATE_COURSE_TEACHER_WORKLOAD_DATA_SUCCESS_MESSAGE =
  "Registro de carga horária do docente no curso foi atualizado!";

const UPDATE_COURSE_TEACHER_WORKLOAD_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]:
    "O registro de carga horária do docente no curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar as informações!",
} as const;

export function EditCourseTeacherWorkloadDataForm({
  teachersOptions,
  courseTeacherWorkloadData,
}: EditCourseTeacherWorkloadDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<RegisterCourseTeacherWorkloadDataDto>({
    resolver: zodResolver(courseTeacherWorkloadDataDtoSchema),
    defaultValues: {
      semester: courseTeacherWorkloadData.semester,
      year: String(courseTeacherWorkloadData.year) as unknown as number,
      teacherId: courseTeacherWorkloadData.teacherId,
      workloadInHours: courseTeacherWorkloadData.workloadInHours,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseTeacherWorkloadData(
    registerCourseTeacherWorkloadDataDto: RegisterCourseTeacherWorkloadDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseTeacherWorkloadDataCSService.update(
        courseTeacherWorkloadData.id,
        registerCourseTeacherWorkloadDataDto
      );

      Toast.success(UPDATE_COURSE_TEACHER_WORKLOAD_DATA_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_COURSE_TEACHER_WORKLOAD_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseTeacherWorkloadData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize as informações de carga horária do docente no curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormSelect
                options={teachersOptions}
                control={control}
                name="teacherId"
                placeholder="Informe o docente"
                label="Docente"
                helper={errors.teacherId?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="workloadInHours"
                placeholder="Carga horária do docente para o curso"
                label="Carga horária em horas"
                helper={errors.workloadInHours?.message}
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
