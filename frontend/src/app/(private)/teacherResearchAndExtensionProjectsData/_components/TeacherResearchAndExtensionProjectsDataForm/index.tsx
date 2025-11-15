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
import { Toast } from "@unidash/utils/toast.util";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import {
  RegisterTeacherResearchAndExtensionProjectsDataDto,
  registerTeacherResearchAndExtensionProjectsDataDtoSchema,
} from "@unidash/api/dtos/teacherResearchAndExtensionProjectsData.dto";
import { TeacherResearchAndExtensionProjectsDataCSService } from "@unidash/services/teacherResearchAndExtensionProjectsData/teacherResearchAndExtensionProjectsData.cs.service";
import { useCan } from "@unidash/hooks/useCan";
import { useCourseStore } from "@unidash/store/course.store";

const REGISTER_TEACHER_RESEARCH_AND_EXTENSION_PROJECTS_DATA_SUCCESS_MESSAGE =
  "Novo registro de projetos de pesquisa e extensão foi adicionado!";

const REGISTER_TEACHER_RESEARCH_AND_EXTENSION_PROJECTS_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de projetos de pesquisa e extensão já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  extensionProjects: "",
  researchProjects: "",
} as unknown as RegisterTeacherResearchAndExtensionProjectsDataDto;

export function TeacherResearchAndExtensionProjectsDataForm() {
  const router = useRouter();
  const isAdmin = useCan(["admin"]);
  const { activeCourse } = useCourseStore();

  const formMethods =
    useForm<RegisterTeacherResearchAndExtensionProjectsDataDto>({
      resolver: zodResolver(
        registerTeacherResearchAndExtensionProjectsDataDtoSchema
      ),
      defaultValues: INITIAL_VALUES,
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendTeacherResearchAndExtensionProjectsData(
    registerTeacherResearchAndExtensionProjectsDataDto: RegisterTeacherResearchAndExtensionProjectsDataDto
  ) {
    try {
      await TeacherResearchAndExtensionProjectsDataCSService.registerByTeacher(
        registerTeacherResearchAndExtensionProjectsDataDto
      );

      Toast.success(
        REGISTER_TEACHER_RESEARCH_AND_EXTENSION_PROJECTS_DATA_SUCCESS_MESSAGE
      );

      const redirectRoute = isAdmin
        ? `${APP_ROUTES.private.teacherResearchAndExtensionProjectsData}${activeCourse?.id}`
        : APP_ROUTES.private.teacherResearchAndExtensionProjectsData;

      router.push(redirectRoute);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          REGISTER_TEACHER_RESEARCH_AND_EXTENSION_PROJECTS_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(sendTeacherResearchAndExtensionProjectsData)}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de projetos de pesquisa e extensão
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="researchProjects"
                placeholder="Quantidade de projetos de pesquisa"
                label="Projetos de pesquisa"
                helper={errors.researchProjects?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="extensionProjects"
                placeholder="Quantidade de projetos de extensão"
                label="Projetos de extensão"
                helper={errors.extensionProjects?.message}
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
