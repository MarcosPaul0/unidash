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
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { CourseTeacherWorkloadDataFormProps } from "./courseTeacherWorkloadDataForm.interface";
import { FormSelect } from "@unidash/components/FormSelect";

const REGISTER_COURSE_TEACHER_WORKLOAD_DATA_SUCCESS_MESSAGE =
  "Novo registro de carga horária do docente no curso foi adicionado!";

const REGISTER_COURSE_TEACHER_WORKLOAD_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de carga horária do docente no curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  teacherId: "",
  workloadInHours: "",
} as unknown as RegisterCourseTeacherWorkloadDataDto;

export function CourseTeacherWorkloadDataForm({
  teachersOptions,
}: CourseTeacherWorkloadDataFormProps) {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseTeacherWorkloadDataDto>({
    resolver: zodResolver(courseTeacherWorkloadDataDtoSchema),
    defaultValues: INITIAL_VALUES,
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

      await CourseTeacherWorkloadDataCSService.register(
        activeCourse.id,
        registerCourseTeacherWorkloadDataDto
      );

      Toast.success(REGISTER_COURSE_TEACHER_WORKLOAD_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseTeacherWorkloadData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_TEACHER_WORKLOAD_DATA_ERROR_MESSAGES,
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
              Registro de informações de carga horária do docente no curso de{" "}
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
              Registrar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
