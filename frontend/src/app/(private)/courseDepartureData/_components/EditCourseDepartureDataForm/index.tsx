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
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { EditCourseDepartureDataFormProps } from "./editCourseDepartureDataForm.interface";

const UPDATE_COURSE_DEPARTURE_DATA_SUCCESS_MESSAGE =
  "Registro de saídas do curso foi atualizado!";

const UPDATE_COURSE_DEPARTURE_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]:
    "O registro de saídas do curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar as informações!",
} as const;

export function EditCourseDepartureDataForm({
  courseDepartureData,
}: EditCourseDepartureDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<RegisterCourseDepartureDataDto>({
    resolver: zodResolver(courseDepartureDataDtoSchema),
    defaultValues: {
      semester: courseDepartureData.semester,
      year: String(courseDepartureData.year) as unknown as number,
      completed: courseDepartureData.completed,
      deaths: courseDepartureData.deaths,
      dropouts: courseDepartureData.dropouts,
      maximumDuration: courseDepartureData.maximumDuration,
      newExams: courseDepartureData.newExams,
      removals: courseDepartureData.removals,
      transfers: courseDepartureData.transfers,
      withdrawals: courseDepartureData.withdrawals,
    },
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

      await CourseDepartureDataCSService.update(
        courseDepartureData.id,
        registerCourseDepartureDataDto
      );

      Toast.success(UPDATE_COURSE_DEPARTURE_DATA_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_COURSE_DEPARTURE_DATA_ERROR_MESSAGES,
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
              Atualize as informações de saídas do curso de {activeCourse?.name}
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
              Atualizar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
