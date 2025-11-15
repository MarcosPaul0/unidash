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
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";

const REGISTER_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE =
  "Novo registro de alunos do curso foi adicionado!";

const REGISTER_COURSE_STUDENTS_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar o aluno!",
  [HTTP_STATUS.conflict]:
    "Esse registro de alunos do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  entrants: "",
  subscribers: "",
  vacancies: "",
} as unknown as RegisterCourseStudentsDataDto;

export function CourseStudentsDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseStudentsDataDto>({
    resolver: zodResolver(courseStudentsDataDtoSchema),
    defaultValues: INITIAL_VALUES,
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

      await CourseStudentsDataCSService.register(
        activeCourse.id,
        registerCourseStudentsDataDto
      );

      Toast.success(REGISTER_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE);

      router.push(`${APP_ROUTES.private.courseStudentsData}${activeCourse.id}`);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_STUDENTS_DATA_ERROR_MESSAGES,
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
              Registro de informações de alunos do curso de {activeCourse?.name}
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
              Registrar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
