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
  RegisterCourseExtensionActivitiesDataDto,
  courseExtensionActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseExtensionActivitiesData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseExtensionActivitiesDataCSService } from "@unidash/services/courseExtensionActivitiesData/courseExtensionActivitiesData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_EXTENSION_ACTIVITIES_DATA_SUCCESS_MESSAGE =
  "Novo registro de atividades de extensão do curso foi adicionado!";

const REGISTER_COURSE_EXTENSION_ACTIVITIES_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de atividades de extensão do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  specialProjects: "",
  cultureAndExtensionProjects: "",
  participationInCompetitions: "",
  entrepreneurshipAndInnovation: "",
  eventOrganization: "",
  externalInternship: "",
  semiannualProjects: "",
  workNonGovernmentalOrganization: "",
  juniorCompanies: "",
  provisionOfServicesWithSelfEmployedWorkers: "",
} as unknown as RegisterCourseExtensionActivitiesDataDto;

export function CourseExtensionActivitiesDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseExtensionActivitiesDataDto>({
    resolver: zodResolver(courseExtensionActivitiesDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseExtensionActivitiesData(
    registerCourseExtensionActivitiesDataDto: RegisterCourseExtensionActivitiesDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseExtensionActivitiesDataCSService.register(
        activeCourse.id,
        registerCourseExtensionActivitiesDataDto
      );

      Toast.success(REGISTER_COURSE_EXTENSION_ACTIVITIES_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseExtensionActivitiesData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_EXTENSION_ACTIVITIES_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseExtensionActivitiesData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de atividades de extensão do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="specialProjects"
                placeholder="Quantidade de projetos especiais"
                label="Projetos especiais"
                helper={errors.specialProjects?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="participationInCompetitions"
                placeholder="Quantidade participações em competições"
                label="Participação em competições"
                helper={errors.participationInCompetitions?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="entrepreneurshipAndInnovation"
                placeholder="Quantidade de atividades de empreendedorismo e inovação"
                label="Empreendedorismo e inovação"
                helper={errors.entrepreneurshipAndInnovation?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="eventOrganization"
                placeholder="Quantidade de organizações de eventos"
                label="Organização de eventos"
                helper={errors.eventOrganization?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="cultureAndExtensionProjects"
                placeholder="Quantidade de projetos de cultura e extensão"
                label="Projetos de cultura e extensão"
                helper={errors.cultureAndExtensionProjects?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="semiannualProjects"
                placeholder="Quantidade de projetos semestral da universidade"
                label="Projeto semestral da universidade"
                helper={errors.semiannualProjects?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="externalInternship"
                placeholder="Quantidade de estágios externos"
                label="Estágios externos"
                helper={errors.externalInternship?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="workNonGovernmentalOrganization"
                placeholder="Quantidade de atuações em organização não governamental"
                label="Atuação em organização não governamental"
                helper={errors.workNonGovernmentalOrganization?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="juniorCompanies"
                placeholder="Quantidade de atividades em empresas juniores"
                label="Empresas juniores"
                helper={errors.juniorCompanies?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="provisionOfServicesWithSelfEmployedWorkers"
                placeholder="Quantidade de prestações de serviço com autônomo"
                label="Prestação de serviço com autônomo"
                helper={
                  errors.provisionOfServicesWithSelfEmployedWorkers?.message
                }
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
