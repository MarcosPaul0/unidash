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
  RegisterCourseDepartureDataDto,
  courseDepartureDataDtoSchema,
} from "@unidash/api/dtos/courseDepartureData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseDepartureDataCSService } from "@unidash/services/courseDepartureData/courseDepartureData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_DEPARTURE_DATA_SUCCESS_MESSAGE =
  "Novo registro de saídas do curso foi adicionado!";

const REGISTER_COURSE_DEPARTURE_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de saídas do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  completed: "",
  deaths: "",
  dropouts: "",
  maximumDuration: "",
  newExams: "",
  removals: "",
  transfers: "",
  withdrawals: "",
} as unknown as RegisterCourseDepartureDataDto;

export function CourseDepartureDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseDepartureDataDto>({
    resolver: zodResolver(courseDepartureDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseDepartureData(
    registerCourseDepartureDataDto: RegisterCourseDepartureDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseDepartureDataCSService.register(
        activeCourse.id,
        registerCourseDepartureDataDto
      );

      Toast.success(REGISTER_COURSE_DEPARTURE_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseDepartureData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_DEPARTURE_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseDepartureData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de saídas do curso de {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="completed"
                placeholder="Quantidade de formações"
                label="Completos"
                helper={errors.completed?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="newExams"
                placeholder="Quantidade de saídas por novos vestibulares"
                label="Novos vestibulares"
                helper={errors.newExams?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="transfers"
                placeholder="Quantidade de transferências"
                label="Transferências"
                helper={errors.transfers?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="maximumDuration"
                placeholder="Quantidade de saídas por prazo máximo"
                label="Prazo máximo"
                helper={errors.maximumDuration?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="withdrawals"
                placeholder="Quantidade de desistências"
                label="Desistências"
                helper={errors.withdrawals?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="dropouts"
                placeholder="Quantidade de abandonos"
                label="Abandonos"
                helper={errors.dropouts?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="removals"
                placeholder="Quantidade de alunos excluídos"
                label="Excluídos"
                helper={errors.removals?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="deaths"
                placeholder="Quantidade de falecimentos"
                label="Falecimentos"
                helper={errors.deaths?.message}
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
