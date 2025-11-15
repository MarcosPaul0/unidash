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
  RegisterCourseSearchComplementaryActivitiesDataDto,
  courseSearchComplementaryActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseSearchComplementaryActivitiesData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseSearchComplementaryActivitiesDataCSService } from "@unidash/services/courseSearchComplementaryActivitiesData/courseSearchComplementaryActivitiesData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_SEARCH_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE =
  "Novo registro de atividades complementares de pesquisa do curso foi adicionado!";

const REGISTER_COURSE_SEARCH_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de atividades complementares de pesquisa do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  developmentInitiation: "",
  fullPublishedArticles: "",
  participationInEvents: "",
  presentationOfWork: "",
  publishedAbstracts: "",
  publishedArticles: "",
  scientificInitiation: "",
} as unknown as RegisterCourseSearchComplementaryActivitiesDataDto;

export function CourseSearchComplementaryActivitiesDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods =
    useForm<RegisterCourseSearchComplementaryActivitiesDataDto>({
      resolver: zodResolver(courseSearchComplementaryActivitiesDataDtoSchema),
      defaultValues: INITIAL_VALUES,
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseSearchComplementaryActivitiesData(
    registerCourseSearchComplementaryActivitiesDataDto: RegisterCourseSearchComplementaryActivitiesDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseSearchComplementaryActivitiesDataCSService.register(
        activeCourse.id,
        registerCourseSearchComplementaryActivitiesDataDto
      );

      Toast.success(
        REGISTER_COURSE_SEARCH_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE
      );

      router.push(
        `${APP_ROUTES.private.courseSearchComplementaryActivitiesData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          REGISTER_COURSE_SEARCH_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(sendCourseSearchComplementaryActivitiesData)}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de atividades complementares de pesquisa
              do curso de {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="scientificInitiation"
                placeholder="Quantidade de iniciações científica"
                label="Iniciações científica"
                helper={errors.scientificInitiation?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="developmentInitiation"
                placeholder="Quantidade de iniciações em desenvolvimento tecnológico"
                label="Iniciações em desenvolvimento tecnológico"
                helper={errors.developmentInitiation?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="publishedArticles"
                placeholder="Quantidade de artigos publicados em periódicos"
                label="Artigos publicados em periódicos"
                helper={errors.publishedArticles?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="fullPublishedArticles"
                placeholder="Quantidade de artigos completos publicados em congressos"
                label="Artigos completos publicados em anais de congressos"
                helper={errors.fullPublishedArticles?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="publishedAbstracts"
                placeholder="Quantidade de resumos publicados em congressos"
                label="Resumos publicados em anais de congressos"
                helper={errors.publishedAbstracts?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="presentationOfWork"
                placeholder="Quantidade deapresentações de trabalhos"
                label="Apresentações de trabalhos"
                helper={errors.presentationOfWork?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="participationInEvents"
                placeholder="Quantidade participações em eventos"
                label="Participações em eventos"
                helper={errors.participationInEvents?.message}
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
