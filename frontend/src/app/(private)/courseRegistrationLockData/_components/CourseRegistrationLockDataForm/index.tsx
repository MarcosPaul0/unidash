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
  RegisterCourseRegistrationLockDataDto,
  courseRegistrationLockDataDtoSchema,
} from "@unidash/api/dtos/courseRegistrationLockData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseRegistrationLockDataCSService } from "@unidash/services/courseRegistrationLockData/courseRegistrationLockData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_REGISTRATION_LOCK_DATA_SUCCESS_MESSAGE =
  "Novo registro de trancamentos do curso foi adicionado!";

const REGISTER_COURSE_REGISTRATION_LOCK_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de trancamentos do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  difficultyInDiscipline: "",
  incompatibilityWithWork: "",
  lossOfInterest: "",
  other: "",
  teacherMethodology: "",
  workload: "",
} as unknown as RegisterCourseRegistrationLockDataDto;

export function CourseRegistrationLockDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseRegistrationLockDataDto>({
    resolver: zodResolver(courseRegistrationLockDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseRegistrationLockData(
    registerCourseRegistrationLockDataDto: RegisterCourseRegistrationLockDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseRegistrationLockDataCSService.register(
        activeCourse.id,
        registerCourseRegistrationLockDataDto
      );

      Toast.success(REGISTER_COURSE_REGISTRATION_LOCK_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseRegistrationLockData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_REGISTRATION_LOCK_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseRegistrationLockData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de trancamentos do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="difficultyInDiscipline"
                placeholder="Quantidade por dificuldades na disciplina"
                label="Dificuldades na disciplina"
                helper={errors.difficultyInDiscipline?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="incompatibilityWithWork"
                placeholder="Quantidade por incompatibilidade com trabalho"
                label="Incompatibilidade com trabalho"
                helper={errors.incompatibilityWithWork?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="lossOfInterest"
                placeholder="Quantidade por perda de interesse"
                label="Perdas de interesse"
                helper={errors.lossOfInterest?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="teacherMethodology"
                placeholder="Quantidade por metodologia do professor"
                label="Metodologia do professor"
                helper={errors.teacherMethodology?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="workload"
                placeholder="Quantidade por carga horária"
                label="Carga horária"
                helper={errors.workload?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="other"
                placeholder="Quantidade por outros motivos"
                label="Outros motivos"
                helper={errors.other?.message}
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
