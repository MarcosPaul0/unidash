"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@unidash/components/FormInput";
import { Button } from "@unidash/components/Button";
import {
  FloppyDiskIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  RegisterCourseActiveStudentsDataDto,
  courseActiveStudentsDataDtoSchema,
} from "@unidash/api/dtos/courseActiveStudentsData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseActiveStudentsDataCSService } from "@unidash/services/courseActiveStudentsData/courseActiveStudentsData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { useEffect } from "react";

const REGISTER_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE =
  "Novo registro de alunos ativos do curso foi adicionado!";

const REGISTER_COURSE_STUDENTS_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar o aluno!",
  [HTTP_STATUS.conflict]:
    "Esse registro de alunos ativos do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  activeStudentsByIngress: [
    {
      ingressYear: new Date().getFullYear().toString(),
      numberOfStudents: "",
    },
  ],
} as unknown as RegisterCourseActiveStudentsDataDto;

export function RegisterCourseActiveStudentsDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseActiveStudentsDataDto>({
    resolver: zodResolver(courseActiveStudentsDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseActiveStudentsData(
    registerCourseActiveStudentsDataDto: RegisterCourseActiveStudentsDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseActiveStudentsDataCSService.register(
        activeCourse.id,
        registerCourseActiveStudentsDataDto
      );

      Toast.success(REGISTER_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseActiveStudentsData}${activeCourse.id}`
      );
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

  function handleAddActiveStudentsByIngress() {
    const currentActiveStudentsByIngress = getValues("activeStudentsByIngress");

    const lastYear =
      currentActiveStudentsByIngress[currentActiveStudentsByIngress.length - 1]
        .ingressYear;

    setValue("activeStudentsByIngress", [
      ...currentActiveStudentsByIngress,
      {
        ingressYear: String(Number(lastYear) - 1) as unknown as number,
        numberOfStudents: "" as unknown as number,
      },
    ]);
  }

  function handleRemoveActiveStudentsByIngress() {
    const currentActiveStudentsByIngress = getValues("activeStudentsByIngress");

    if (currentActiveStudentsByIngress.length === 1) {
      return;
    }

    setValue(
      "activeStudentsByIngress",
      currentActiveStudentsByIngress.slice(
        0,
        currentActiveStudentsByIngress.length - 1
      )
    );
  }

  const referenceYear = watch("year");

  useEffect(() => {
    const currentActiveStudentsByIngress = getValues("activeStudentsByIngress");

    const newActiveStudentsByIngress = currentActiveStudentsByIngress.map(
      (activeStudentsByIngress, index) => ({
        ...activeStudentsByIngress,
        ingressYear: referenceYear - index,
      })
    );

    setValue("activeStudentsByIngress", newActiveStudentsByIngress);
  }, [getValues, referenceYear, setValue]);

  const activeStudentsByIngress = watch("activeStudentsByIngress");

  const removeActiveStudentsByIngressIsDisabled =
    activeStudentsByIngress.length === 1;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseActiveStudentsData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de alunos ativos do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            {activeStudentsByIngress.map((activeStudents, index) => (
              <FormInput
                key={activeStudents.ingressYear}
                control={control}
                type="number"
                className="max-w-xl"
                name={`activeStudentsByIngress.${index}.numberOfStudents`}
                placeholder="Quantidade de discentes ativos"
                label={`Quantos alunos que estão ativos em ${referenceYear} ingressaram em ${activeStudents.ingressYear}?`}
                helper={
                  errors.activeStudentsByIngress?.[index]?.numberOfStudents
                    ?.message
                }
              />
            ))}

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <Button
                type="button"
                onClick={handleAddActiveStudentsByIngress}
                variant="ghost"
              >
                <PlusIcon />
                Adicionar alunos ativos por ano de ingresso
              </Button>
              <Button
                type="button"
                onClick={handleRemoveActiveStudentsByIngress}
                disabled={removeActiveStudentsByIngressIsDisabled}
                variant="ghost"
              >
                <MinusIcon />
                Remover alunos ativos por ano de ingresso
              </Button>
            </div>
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
