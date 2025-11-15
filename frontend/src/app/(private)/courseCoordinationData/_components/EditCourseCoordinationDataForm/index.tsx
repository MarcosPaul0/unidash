"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardInputsRow,
  CardSubtitle,
  CardTitle,
} from "@unidash/components/Card";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@unidash/components/FormInput";
import { Button } from "@unidash/components/Button";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr";
import {
  RegisterCourseCoordinationDataDto,
  courseCoordinationDataDtoSchema,
} from "@unidash/api/dtos/courseCoordinationData.dto";
import { useCourseStore } from "@unidash/store/course.store";
import { Toast } from "@unidash/utils/toast.util";
import { CourseCoordinationDataCSService } from "@unidash/services/courseCoordinationData/courseCoordinationData.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeriodForm } from "@unidash/app/(private)/courseStudentsData/_components/PeriodForm";
import { FormTextarea } from "@unidash/components/FormTextarea";
import { EditCourseCoordinationDataFormProps } from "./editCourseCoordinationDataForm.interface";

const UPDATE_COURSE_COORDINATION_DATA_SUCCESS_MESSAGE =
  "Registro da coordenação do curso foi atualizado!";

const UPDATE_COURSE_COORDINATION_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]:
    "O registro da coordenação do curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao atualizar as informações!",
} as const;

export function EditCourseCoordinationDataForm({
  courseCoordinationData,
}: EditCourseCoordinationDataFormProps) {
  const { activeCourse } = useCourseStore();

  const formMethods = useForm<RegisterCourseCoordinationDataDto>({
    resolver: zodResolver(courseCoordinationDataDtoSchema),
    defaultValues: {
      semester: courseCoordinationData.semester,
      year: courseCoordinationData.year,
      administrativeDecisionActions:
        courseCoordinationData.administrativeDecisionActions,
      meetingsByBoardOfDirectors:
        courseCoordinationData.meetingsByBoardOfDirectors,
      meetingsByCourseCouncil: courseCoordinationData.meetingsByCourseCouncil,
      meetingsByUndergraduateChamber:
        courseCoordinationData.meetingsByUndergraduateChamber,
      meetingsByNde: courseCoordinationData.meetingsByNde,
      resolutionActions: courseCoordinationData.resolutionActions,
      servicesRequestsByEmail: courseCoordinationData.servicesRequestsByEmail,
      servicesRequestsBySystem: courseCoordinationData.servicesRequestsBySystem,
      academicActionPlans: courseCoordinationData.academicActionPlans,
      administrativeActionPlans:
        courseCoordinationData.administrativeActionPlans,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  async function sendCourseCoordinationData(
    registerCourseCoordinationDataDto: RegisterCourseCoordinationDataDto
  ) {
    try {
      if (!activeCourse) {
        Toast.error(
          "É necessário selecionar o curso para registrar as informações!"
        );
        return;
      }

      await CourseCoordinationDataCSService.update(
        courseCoordinationData.id,
        registerCourseCoordinationDataDto
      );

      Toast.success(UPDATE_COURSE_COORDINATION_DATA_SUCCESS_MESSAGE);
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: UPDATE_COURSE_COORDINATION_DATA_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(sendCourseCoordinationData)}>
        <Card>
          <CardHeader>
            <CardTitle>
              Atualize as informações da coordenação do curso de{" "}
              {activeCourse?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 md:gap-8">
            <PeriodForm />

            <CardSubtitle>Informações de reuniões realizadas</CardSubtitle>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="meetingsByBoardOfDirectors"
                placeholder="Quantidade de reuniões por conselho diretor"
                label="Reuniões por conselho diretor"
                helper={errors.meetingsByBoardOfDirectors?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="meetingsByCourseCouncil"
                placeholder="Quantidade de reuniões por colegiado de curso"
                label="Reuniões por colegiado de curso"
                helper={errors.meetingsByCourseCouncil?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="meetingsByUndergraduateChamber"
                placeholder="Quantidade de reuniões por câmara de graduação"
                label="Reuniões por câmara de graduação"
                helper={errors.meetingsByUndergraduateChamber?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="meetingsByNde"
                placeholder="Quantidade de reuniões por NDE"
                label="Reuniões por NDE"
                helper={errors.meetingsByNde?.message}
              />
            </CardInputsRow>

            <CardSubtitle>Informações de atendimentos realizadas</CardSubtitle>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="administrativeDecisionActions"
                placeholder="Quantidade de decisões administrativas"
                label="Decisões administrativas"
                helper={errors.administrativeDecisionActions?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="resolutionActions"
                placeholder="Quantidade de resoluções"
                label="Resoluções"
                helper={errors.resolutionActions?.message}
              />
            </CardInputsRow>

            <CardInputsRow>
              <FormInput
                control={control}
                type="number"
                name="servicesRequestsByEmail"
                placeholder="Quantidade de atendimentos por email"
                label="Atendimentos por email"
                helper={errors.servicesRequestsByEmail?.message}
              />
              <FormInput
                control={control}
                type="number"
                name="servicesRequestsBySystem"
                placeholder="Quantidade de atendimentos por SIGAA"
                label="Atendimentos por SIGAA"
                helper={errors.servicesRequestsBySystem?.message}
              />
            </CardInputsRow>

            <CardSubtitle>Informações do plano de ações executado</CardSubtitle>

            <FormTextarea
              control={control}
              name="administrativeActionPlans"
              placeholder="Descreva as ações administrativas realizadas"
              label="Descrição das ações administrativas realizadas"
              helper={errors.administrativeActionPlans?.message}
              className="resize-none"
              rows={4}
            />

            <FormTextarea
              control={control}
              name="academicActionPlans"
              placeholder="Descreva as ações acadêmicas realizadas"
              label="Descrição das ações acadêmicas realizadas"
              helper={errors.academicActionPlans?.message}
              className="resize-none"
              rows={4}
            />
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
