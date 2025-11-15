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
  UpdateCourseActiveStudentsDataDto,
  courseActiveStudentsDataDtoSchema,
} from "@unidash/api/dtos/courseActiveStudentsData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseActiveStudentsDataCSService } from "@unidash/services/courseActiveStudentsData/courseActiveStudentsData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { useEffect } from "react";
import { EditCourseActiveStudentsDataFormProps } from "./editCourseActiveStudentsDataForm.interface";

const UPDATE_COURSE_STUDENTS_DATA_SUCCESS_MESSAGE =
  "Registro de alunos ativos do curso foi atualizado!";

const UPDATE_COURSE_STUDENTS_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O registro informado não foi encontrado!",
  [HTTP_STATUS.badRequest]:
    "Ocorreu algum erro ao atualizar o regirsto de aluno ativo!",
} as const;

export function EditCourseActiveStudentsDataForm({
  courseActiveStudentsData,
}: EditCourseActiveStudentsDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<UpdateCourseActiveStudentsDataDto>({
    resolver: zodResolver(courseActiveStudentsDataDtoSchema),
    defaultValues: {
      activeStudentsByIngress: courseActiveStudentsData.activeStudents,
      semester: courseActiveStudentsData.semester,
      year: String(courseActiveStudentsData.year) as unknown as number,
    },
  });
  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function updateCourseActiveStudentsData(
    updateCourseActiveStudentsDataDto: UpdateCourseActiveStudentsDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para atualizar as informações!"
        );
        return;
      }

      await CourseActiveStudentsDataCSService.update(
        courseActiveStudentsData.id,
        updateCourseActiveStudentsDataDto
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
      <form onSubmit={handleSubmit(updateCourseActiveStudentsData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize as informações de alunos ativos do curso de{" "}
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
              Atualizar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
