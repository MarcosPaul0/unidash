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
  RegisterCourseExtensionComplementaryActivitiesDataDto,
  courseExtensionComplementaryActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseExtensionComplementaryActivitiesData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseExtensionComplementaryActivitiesDataCSService } from "@unidash/services/courseExtensionComplementaryActivitiesData/courseExtensionComplementaryActivitiesData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { EditCourseExtensionComplementaryActivitiesDataFormProps } from "./editCourseExtensionComplementaryActivitiesDataForm.interface";

const UPDATE_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE =
  "Registro de atividades complementares de extensão do curso foi atualizado!";

const UPDATE_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]:
    "O registro de atividades complementares de extensão do curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar as informações!",
} as const;

export function EditCourseExtensionComplementaryActivitiesDataForm({
  courseExtensionComplementaryActivitiesData,
}: EditCourseExtensionComplementaryActivitiesDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods =
    useForm<RegisterCourseExtensionComplementaryActivitiesDataDto>({
      resolver: zodResolver(
        courseExtensionComplementaryActivitiesDataDtoSchema
      ),
      defaultValues: {
        semester: courseExtensionComplementaryActivitiesData.semester,
        year: String(
          courseExtensionComplementaryActivitiesData.year
        ) as unknown as number,
        awardsAtEvents:
          courseExtensionComplementaryActivitiesData.awardsAtEvents,
        culturalActivities:
          courseExtensionComplementaryActivitiesData.culturalActivities,
        participationInCollegiateBodies:
          courseExtensionComplementaryActivitiesData.participationInCollegiateBodies,
        sportsCompetitions:
          courseExtensionComplementaryActivitiesData.sportsCompetitions,
        studentRepresentation:
          courseExtensionComplementaryActivitiesData.studentRepresentation,
      },
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseExtensionComplementaryActivitiesData(
    registerCourseExtensionComplementaryActivitiesDataDto: RegisterCourseExtensionComplementaryActivitiesDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseExtensionComplementaryActivitiesDataCSService.update(
        courseExtensionComplementaryActivitiesData.id,
        registerCourseExtensionComplementaryActivitiesDataDto
      );

      Toast.success(
        UPDATE_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          UPDATE_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(sendCourseExtensionComplementaryActivitiesData)}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize as informações de atividades complementares de extensão
              do curso de {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="culturalActivities"
                placeholder="Quantidade de atividades culturais"
                label="Atividades culturais, socialização e integração"
                helper={errors.culturalActivities?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="sportsCompetitions"
                placeholder="Quantidade participações em competições esportivas"
                label="Participação em competições esportivas"
                helper={errors.sportsCompetitions?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="awardsAtEvents"
                placeholder="Quantidade de premiações em eventos representando a UNIFEI"
                label="Premiação em eventos representando a UNIFEI"
                helper={errors.awardsAtEvents?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="studentRepresentation"
                placeholder="Quantidade de representações estudantil"
                label="Representação estudantil"
                helper={errors.studentRepresentation?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="participationInCollegiateBodies"
                placeholder="Quantidade de participações em órgãos colegiados"
                label="Participação em órgãos colegiados"
                helper={errors.participationInCollegiateBodies?.message}
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
