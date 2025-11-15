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
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE =
  "Novo registro de atividades complementares de extensão do curso foi adicionado!";

const REGISTER_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de atividades complementares de extensão do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  awardsAtEvents: "",
  culturalActivities: "",
  participationInCollegiateBodies: "",
  sportsCompetitions: "",
  studentRepresentation: "",
} as unknown as RegisterCourseExtensionComplementaryActivitiesDataDto;

export function CourseExtensionComplementaryActivitiesDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods =
    useForm<RegisterCourseExtensionComplementaryActivitiesDataDto>({
      resolver: zodResolver(
        courseExtensionComplementaryActivitiesDataDtoSchema
      ),
      defaultValues: INITIAL_VALUES,
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

      await CourseExtensionComplementaryActivitiesDataCSService.register(
        activeCourse.id,
        registerCourseExtensionComplementaryActivitiesDataDto
      );

      Toast.success(
        REGISTER_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE
      );

      router.push(
        `${APP_ROUTES.private.courseExtensionComplementaryActivitiesData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          REGISTER_COURSE_EXTENSION_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES,
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
              Registro de informações de atividades complementares de extensão
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
              Registrar dados
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
