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
  RegisterTeacherTechnicalScientificProductionsDataDto,
  registerTeacherTechnicalScientificProductionsDataDtoSchema,
} from "@unidash/api/dtos/teacherTechnicalScientificProductionsData.dto";
import { TeacherTechnicalScientificProductionsDataCSService } from "@unidash/services/teacherTechnicalScientificProductionsData/teacherTechnicalScientificProductionsData.cs.service";

const REGISTER_TEACHER_TECHNICAL_SCIENTIFIC_PRODUCTIONS_SUCCESS_MESSAGE =
  "Novo registro de produções técnico-científicas foi adicionado!";

const REGISTER_TEACHER_TECHNICAL_SCIENTIFIC_PRODUCTIONS_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de produções técnico-científicas já existe! Confira o período e ano do registro.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  abstracts: "",
  booksChapter: "",
  congress: "",
  periodicals: "",
  programs: "",
} as unknown as RegisterTeacherTechnicalScientificProductionsDataDto;

export function TeacherTechnicalScientificProductionsDataForm() {
  const router = useRouter();

  const formMethods =
    useForm<RegisterTeacherTechnicalScientificProductionsDataDto>({
      resolver: zodResolver(
        registerTeacherTechnicalScientificProductionsDataDtoSchema
      ),
      defaultValues: INITIAL_VALUES,
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendTeacherTechnicalScientificProductionsData(
    registerTeacherTechnicalScientificProductionsDataDto: RegisterTeacherTechnicalScientificProductionsDataDto
  ) {
    try {
      await TeacherTechnicalScientificProductionsDataCSService.registerByTeacher(
        registerTeacherTechnicalScientificProductionsDataDto
      );

      Toast.success(
        REGISTER_TEACHER_TECHNICAL_SCIENTIFIC_PRODUCTIONS_SUCCESS_MESSAGE
      );

      router.push(APP_ROUTES.private.teacherTechnicalScientificProductionsData);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap:
          REGISTER_TEACHER_TECHNICAL_SCIENTIFIC_PRODUCTIONS_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(sendTeacherTechnicalScientificProductionsData)}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de produções técnico-científicas
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="periodicals"
                placeholder="Quantidade de periódicos"
                label="Periódicos"
                helper={errors.periodicals?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="congress"
                placeholder="Quantidade de congressos"
                label="Congressos"
                helper={errors.congress?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="abstracts"
                placeholder="Quantidade de resumos"
                label="Resumos"
                helper={errors.abstracts?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="booksChapter"
                placeholder="Quantidade de capítulos de livros"
                label="Capítulos de livros"
                helper={errors.booksChapter?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="programs"
                placeholder="Quantidade de softwares"
                label="Softwares"
                helper={errors.programs?.message}
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
