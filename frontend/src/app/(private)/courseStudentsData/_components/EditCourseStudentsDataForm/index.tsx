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
  RegisterCourseStudentsDataDto,
  courseStudentsDataDtoSchema,
} from "@unidash/api/dtos/courseStudentsData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { PeriodForm } from "../PeriodForm";
import { Toast } from "@unidash/utils/toast.util";
import { CourseStudentsDataCSService } from "@unidash/services/courseStudentsData/courseStudentsData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditCourseStudentsDataFormProps } from "./editCourseStudentsDataForm.interface";

const UPDATE_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE =
  "Registro de alunos do curso foi atualizado!";

const UPDATE_COURSE_STUDENTS_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]:
    "O registro de alunos do curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar o aluno!",
} as const;

export function EditCourseStudentsDataForm({
  courseStudentsData,
}: EditCourseStudentsDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<RegisterCourseStudentsDataDto>({
    resolver: zodResolver(courseStudentsDataDtoSchema),
    defaultValues: {
      semester: courseStudentsData.semester,
      year: String(courseStudentsData.year) as unknown as number,
      entrants: courseStudentsData.entrants,
      subscribers: courseStudentsData.subscribers,
      vacancies: courseStudentsData.vacancies,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseStudentsData(
    registerCourseStudentsDataDto: RegisterCourseStudentsDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseStudentsDataCSService.update(
        courseStudentsData.id,
        registerCourseStudentsDataDto
      );

      Toast.success(UPDATE_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_COURSE_STUDENTS_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseStudentsData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize as informações de alunos do curso de {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="vacancies"
                placeholder="Quantidade vagas para alunos"
                label="Vagas para alunos"
                helper={errors.vacancies?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="subscribers"
                placeholder="Quantidade de inscritos"
                label="Inscritos"
                helper={errors.subscribers?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="entrants"
                placeholder="Quantidade de alunos ingressantes"
                label="Alunos ingressantes"
                helper={errors.entrants?.message}
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
