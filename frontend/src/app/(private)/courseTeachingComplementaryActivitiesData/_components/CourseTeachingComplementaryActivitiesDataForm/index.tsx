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
  RegisterCourseTeachingComplementaryActivitiesDataDto,
  courseTeachingComplementaryActivitiesDataDtoSchema,
} from "@unidash/api/dtos/courseTeachingComplementaryActivitiesData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseTeachingComplementaryActivitiesDataCSService } from "@unidash/services/courseTeachingComplementaryActivitiesData/courseTeachingComplementaryActivitiesData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";

const REGISTER_COURSE_TEACHING_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE =
  "Novo registro de atividades complementares de ensino do curso foi adicionado!";

const REGISTER_COURSE_TEACHING_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de atividades complementares de ensino do curso já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  complementaryCoursesInTheArea: "",
  coursesInTheArea: "",
  coursesOutsideTheArea: "",
  electivesDisciplines: "",
  preparationForTest: "",
  providingTraining: "",
  sponsorshipOfNewStudents: "",
  subjectMonitoring: "",
} as unknown as RegisterCourseTeachingComplementaryActivitiesDataDto;

export function CourseTeachingComplementaryActivitiesDataForm() {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods =
    useForm<RegisterCourseTeachingComplementaryActivitiesDataDto>({
      resolver: zodResolver(courseTeachingComplementaryActivitiesDataDtoSchema),
      defaultValues: INITIAL_VALUES,
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseTeachingComplementaryActivitiesData(
    registerCourseTeachingComplementaryActivitiesDataDto: RegisterCourseTeachingComplementaryActivitiesDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseTeachingComplementaryActivitiesDataCSService.register(
        activeCourse.id,
        registerCourseTeachingComplementaryActivitiesDataDto
      );

      Toast.success(
        REGISTER_COURSE_TEACHING_COMPLEMENTARY_ACTIVITIES_DATA_SUCCESS_MESSAGE
      );

      router.push(
        `${APP_ROUTES.private.courseTeachingComplementaryActivitiesData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          REGISTER_COURSE_TEACHING_COMPLEMENTARY_ACTIVITIES_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(sendCourseTeachingComplementaryActivitiesData)}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de atividades complementares de ensino do
              curso de {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="electivesDisciplines"
                placeholder="Quantidade de disciplinas eletivas"
                label="Disciplinas eletivas"
                helper={errors.electivesDisciplines?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="preparationForTest"
                placeholder="Quantidade de preparações"
                label="Preparação para o ENADE"
                helper={errors.preparationForTest?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="subjectMonitoring"
                placeholder="Quantidade de monitorias"
                label="Monitoria de disciplinas"
                helper={errors.subjectMonitoring?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="sponsorshipOfNewStudents"
                placeholder="Quantidade de apadrinhamentos"
                label="Apadrinhamento de ingressantes"
                helper={errors.sponsorshipOfNewStudents?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="providingTraining"
                placeholder="Quantidade de treinamentos"
                label="Ministração de treinamentos"
                helper={errors.providingTraining?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="coursesInTheArea"
                placeholder="Quantidade de cursos"
                label="Cursos relacionados à área do curso"
                helper={errors.coursesInTheArea?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="complementaryCoursesInTheArea"
                placeholder="Quantidade de cursos"
                label="Cursos complementares à área do curso"
                helper={errors.complementaryCoursesInTheArea?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="coursesOutsideTheArea"
                placeholder="Quantidade de cursos"
                label="Cursos não relacionados à área do curso"
                helper={errors.coursesOutsideTheArea?.message}
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
