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
  EMPLOYMENT_TYPE,
  RegisterCourseInternshipDataDto,
  courseInternshipDataDtoSchema,
} from "@unidash/api/dtos/courseInternshipData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseInternshipDataCSService } from "@unidash/services/courseInternshipData/courseInternshipData.cs.service";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { CourseInternshipDataFormProps } from "./courseInternshipDataForm.interface";
import { FormSelect } from "@unidash/components/FormSelect";
import { CitiesSelect } from "@unidash/app/(private)/_components/CitiesSelect";

const REGISTER_COURSE_INTERNSHIP_DATA_SUCCESS_MESSAGE =
  "Novo registro de estágio do curso foi adicionado!";

const REGISTER_COURSE_INTERNSHIP_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de estágio do curso já existe! Confira a matrícula do discente.",
} as const;

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  advisorId: "",
  cityId: "",
  conclusionTimeInDays: "",
  employmentType: "internship",
  enterpriseCnpj: "",
  role: "",
  studentMatriculation: "",
} as unknown as RegisterCourseInternshipDataDto;

export function CourseInternshipDataForm({
  teachersOptions,
}: CourseInternshipDataFormProps) {
  const { activeCourse } = useCourseStore();

  const router = useRouter();

  const formMethods = useForm<RegisterCourseInternshipDataDto>({
    resolver: zodResolver(courseInternshipDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseInternshipData(
    registerCourseInternshipDataDto: RegisterCourseInternshipDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseInternshipDataCSService.register(
        activeCourse.id,
        registerCourseInternshipDataDto
      );

      Toast.success(REGISTER_COURSE_INTERNSHIP_DATA_SUCCESS_MESSAGE);

      router.push(
        `${APP_ROUTES.private.courseInternshipData}${activeCourse.id}`
      );
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: REGISTER_COURSE_INTERNSHIP_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseInternshipData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Registro de informações de estágio do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardInputsRow>
              <FormInput
                control={control}
                name="studentMatriculation"
                placeholder="Informe a matrícula do aluno"
                label="Matrícula do aluno"
                helper={errors.studentMatriculation?.message}
              />
              <FormSelect
                options={teachersOptions}
                control={control}
                name="advisorId"
                placeholder="Informe o orientador"
                label="Orientador"
                helper={errors.advisorId?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                name="role"
                placeholder="Informe a atuação"
                label="Atuação"
                helper={errors.role?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="conclusionTimeInDays"
                placeholder="Informe o número de dias para conclusão"
                label="Tempo de conclusão em dias"
                helper={errors.conclusionTimeInDays?.message}
              />
              <FormSelect
                options={[
                  {
                    label: "Estágio",
                    value: EMPLOYMENT_TYPE.internship,
                  },
                  {
                    label: "CLT",
                    value: EMPLOYMENT_TYPE.employmentContract,
                  },
                  {
                    label: "PJ",
                    value: EMPLOYMENT_TYPE.independentContractor,
                  },
                ]}
                control={control}
                name="employmentType"
                placeholder="Informe o tipo de vínculo"
                label="Tipo de vínculo"
                helper={errors.employmentType?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                name="enterpriseCnpj"
                placeholder="Informe o CNPJ da empresa"
                label="CNPJ"
                helper={errors.enterpriseCnpj?.message}
              />

              <CitiesSelect
                control={control}
                name="cityId"
                helper={errors.cityId?.message}
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
