"use client";

import { Card, CardContent, CardSubtitle } from "@unidash/components/Card";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@unidash/components/Button";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { FormRadioGroup } from "@unidash/components/FormRadioGroup";
import { FormCheckbox } from "@unidash/components/FormCheckbox";
import { useRouter } from "next/navigation";
import { HTTP_STATUS } from "@unidash/lib/baseApiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AFFINITY_LEVEL,
  ASSET,
  COURSE_CHOICE_REASON,
  CURRENT_EDUCATION,
  ENGLISH_PROFICIENCY_LEVEL,
  HIGH_SCHOOL_DISCIPLINE,
  HOBBY_OR_HABIT,
  RegisterStudentIncomingDataDto,
  registerStudentIncomingDataDtoSchema,
  TECHNOLOGY,
  UNIVERSITY_CHOICE_REASON,
  WORK_EXPECTATION,
} from "@unidash/api/dtos/studentIncomingData.dto";
import { Toast } from "@unidash/utils/toast.util";
import { StudentIncomingDataCSService } from "@unidash/services/studentIncomingData/studentIncomingData.cs.service";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { CitiesSelect } from "@unidash/app/(private)/_components/CitiesSelect";

const REGISTER_COURSE_INTERNSHIP_DATA_SUCCESS_MESSAGE =
  "Novo registro de estágio do curso foi adicionado!";

const REGISTER_COURSE_INTERNSHIP_DATA_ERROR_MESSAGES = {
  [HTTP_STATUS.forbidden]:
    "Você não tem permissão para realizar essa operação!",
  [HTTP_STATUS.notFound]: "O curso informado não foi encontrado!",
  [HTTP_STATUS.badRequest]: "Ocorreu algum erro ao registrar as informações!",
  [HTTP_STATUS.conflict]:
    "Esse registro de estágio do curso já existe! Confira o período e ano do registro.",
} as const;

const CURRENT_EDUCATION_OPTIONS = [
  {
    label: "Formação técnica na área do curso",
    value: CURRENT_EDUCATION.technicalInField,
  },
  {
    label: "Formação técnica não relacionado a área do curso",
    value: CURRENT_EDUCATION.technicalOutField,
  },
  {
    label: "Formação superior na área do curso",
    value: CURRENT_EDUCATION.higherInField,
  },
  {
    label: "Formação superior não relacionado a área do curso",
    value: CURRENT_EDUCATION.higherOutField,
  },
  {
    label: "Não possui",
    value: CURRENT_EDUCATION.none,
  },
];

const ENGLISH_PROFICIENCY_LEVEL_OPTIONS = [
  {
    label: "Fluente (leitura, escrita e conversação).",
    value: ENGLISH_PROFICIENCY_LEVEL.fluent,
  },
  {
    label:
      "Intermediário (ex. leitura técnica, legendas de vídeos em inglês e entendimento parcial de áudio em inglês).",
    value: ENGLISH_PROFICIENCY_LEVEL.intermediate,
  },
  {
    label: "Baixo, necessito da ajuda de tradutor.",
    value: ENGLISH_PROFICIENCY_LEVEL.low,
  },
];

const WORK_EXPECTATION_OPTIONS = [
  {
    label: "CLT",
    value: WORK_EXPECTATION.employmentContract,
  },
  {
    label: "PJ",
    value: WORK_EXPECTATION.independentContractor,
  },
  {
    label: "Área acadêmica",
    value: WORK_EXPECTATION.academicCareer,
  },
  {
    label: "Empresa pública",
    value: WORK_EXPECTATION.publicSector,
  },
  {
    label: "Não sabe",
    value: WORK_EXPECTATION.undecided,
  },
];

const BOOLEAN_OPTIONS = [
  {
    label: "Sim",
    value: true,
  },
  {
    label: "Não",
    value: false,
  },
];

const AFFINITY_LEVEL_OPTIONS = [
  {
    label: "Pouco",
    value: AFFINITY_LEVEL.low,
  },
  {
    label: "Médio",
    value: AFFINITY_LEVEL.medium,
  },
  {
    label: "Muita",
    value: AFFINITY_LEVEL.high,
  },
];

const HOBBY_OR_HABITS_OPTIONS = [
  {
    label: "Esportes coletivos",
    value: HOBBY_OR_HABIT.teamSports,
  },
  {
    label: "Atividades físicas",
    value: HOBBY_OR_HABIT.physicalActivity,
  },
  {
    label: "Esportes individuais",
    value: HOBBY_OR_HABIT.individualSports,
  },
  {
    label: "Jogos Eletrônicos",
    value: HOBBY_OR_HABIT.videoGames,
  },
  {
    label: "Leituras",
    value: HOBBY_OR_HABIT.reading,
  },
  {
    label: "Escutar Música",
    value: HOBBY_OR_HABIT.listeningMusic,
  },
  {
    label: "Passar o tempo navegando na internet",
    value: HOBBY_OR_HABIT.internetBrowsing,
  },
  {
    label: "Redes sociais",
    value: HOBBY_OR_HABIT.socialMedia,
  },
  {
    label: "Viajar",
    value: HOBBY_OR_HABIT.traveling,
  },
  {
    label: "Tabalhos manuais",
    value: HOBBY_OR_HABIT.handcrafting,
  },
  {
    label: "Filmes e séries",
    value: HOBBY_OR_HABIT.moviesOrSeries,
  },
  {
    label: "Tocar instrumento musical",
    value: HOBBY_OR_HABIT.playingInstrument,
  },

  {
    label: "Outros",
    value: HOBBY_OR_HABIT.other,
  },
];

const UNIVERSITY_CHOICE_REASONS_OPTIONS = [
  {
    label: "Renome da UNIFEI",
    value: UNIVERSITY_CHOICE_REASON.reputation,
  },
  {
    label: "Pessoas próximas",
    value: UNIVERSITY_CHOICE_REASON.closePeople,
  },
  {
    label: "Próximo a cidade de origem",
    value: UNIVERSITY_CHOICE_REASON.closeOriginCity,
  },
  {
    label: "Ensino público",
    value: UNIVERSITY_CHOICE_REASON.publicEducation,
  },
  {
    label: "Motivos profissionais",
    value: UNIVERSITY_CHOICE_REASON.professionalReasons,
  },
  {
    label: "Motivos financeiros",
    value: UNIVERSITY_CHOICE_REASON.financialReasons,
  },
  {
    label: "Não foi a primeira escolha",
    value: UNIVERSITY_CHOICE_REASON.notFirstChoice,
  },
  {
    label: "Outro",
    value: UNIVERSITY_CHOICE_REASON.other,
  },
];

const COURSE_CHOICE_REASONS_OPTIONS = [
  {
    label: "Qualidade do curso",
    value: COURSE_CHOICE_REASON.courseQuality,
  },
  {
    label: "Motivos financeiros",
    value: COURSE_CHOICE_REASON.financialReasons,
  },
  {
    label: "Hobbies relacionado com o curso",
    value: COURSE_CHOICE_REASON.hobbyRelation,
  },
  {
    label: "Mais interessante pelo SISU",
    value: COURSE_CHOICE_REASON.sisuPreference,
  },
  {
    label: "Atualização profissional",
    value: COURSE_CHOICE_REASON.professionalUpdate,
  },
  {
    label: "Não foi minha primeira opção",
    value: COURSE_CHOICE_REASON.notFirstChoice,
  },
  {
    label: "Outro",
    value: COURSE_CHOICE_REASON.other,
  },
];

const TECHNOLOGIES_OPTIONS = [
  {
    label: "Navegação na internet",
    value: TECHNOLOGY.internetNavigation,
  },
  {
    label: "Instalação de softwares",
    value: TECHNOLOGY.softwareInstallation,
  },
  {
    label: "Programas e linguagens",
    value: TECHNOLOGY.programmingAndLanguages,
  },
  {
    label: "Planilhas",
    value: TECHNOLOGY.spreadsheets,
  },
  {
    label: "Instalação de SO",
    value: TECHNOLOGY.operatingSystemSetup,
  },
  {
    label: "Editor de texto",
    value: TECHNOLOGY.textEditor,
  },
  {
    label: "Instalação de eletrônicos",
    value: TECHNOLOGY.electronicsInstallation,
  },
  {
    label: "Editoração de apresentações",
    value: TECHNOLOGY.presentationEditing,
  },
  {
    label: "Edição de vídeo",
    value: TECHNOLOGY.videoEditing,
  },
  {
    label: "Aplicativos de desenho",
    value: TECHNOLOGY.drawingApps,
  },
  {
    label: "Plataforma de prototipação",
    value: TECHNOLOGY.prototypingPlatform,
  },
];

const ASSETS_OPTIONS = [
  {
    label: "Internet",
    value: ASSET.internet,
  },
  {
    label: "Smartphone",
    value: ASSET.smartphone,
  },
  {
    label: "Desktop",
    value: ASSET.desktopComputer,
  },

  {
    label: "Notebook",
    value: ASSET.laptop,
  },
  {
    label: "Smart TV",
    value: ASSET.smartTv,
  },
  {
    label: "TV a cabo",
    value: ASSET.payTv,
  },
  {
    label: "Impressora",
    value: ASSET.printer,
  },
  {
    label: "Tablet",
    value: ASSET.tablet,
  },
  {
    label: "Assistente virtual",
    value: ASSET.virtualAssistant,
  },
  {
    label: "Carro",
    value: ASSET.car,
  },
  {
    label: "Moto",
    value: ASSET.motorcycle,
  },
];

const INITIAL_VALUES = {
  semester: "first",
  year: new Date().getFullYear().toString(),
  cityId: "",
  affinityByDisciplines: [
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.mathematics,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.portuguese,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.chemical,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.history,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.physical,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.geography,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.biology,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.english,
    },
    {
      affinityLevel: "low",
      discipline: HIGH_SCHOOL_DISCIPLINE.technology,
    },
  ],
  assets: [],
  courseChoiceReasons: [],
  hobbyOrHabits: [],
  knowRelatedCourseDifference: false,
  nocturnalPreference: false,
  readPedagogicalProject: false,
  technologies: [],
  universityChoiceReasons: [],
  workExpectation: "undecided",
  currentEducation: "none",
  englishProficiencyLevel: "low",
} as unknown as RegisterStudentIncomingDataDto;

export function StudentIncomingDataForm() {
  const router = useRouter();

  const formMethods = useForm<RegisterStudentIncomingDataDto>({
    resolver: zodResolver(registerStudentIncomingDataDtoSchema),
    defaultValues: INITIAL_VALUES,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  async function sendStudentIncomingData(
    registerStudentIncomingDataDto: RegisterStudentIncomingDataDto
  ) {
    try {
      await StudentIncomingDataCSService.register(
        registerStudentIncomingDataDto
      );

      Toast.success(REGISTER_COURSE_INTERNSHIP_DATA_SUCCESS_MESSAGE);

      router.push(APP_ROUTES.private.dashboard);
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
      <form onSubmit={handleSubmit(sendStudentIncomingData)}>
        <Card>
          <CardContent className="flex flex-col gap-4 md:gap-8">
            <CardSubtitle>Qual e nome da sua cidade origem?</CardSubtitle>

            <CitiesSelect
              control={control}
              name="cityId"
              helper={errors.cityId?.message}
            />

            <CardSubtitle>Qual sua formação atual?</CardSubtitle>

            <FormRadioGroup
              control={control}
              name="currentEducation"
              options={CURRENT_EDUCATION_OPTIONS}
            />

            <CardSubtitle>
              Qual seu nível de proficiência em inglês?
            </CardSubtitle>

            <FormRadioGroup
              control={control}
              name="englishProficiencyLevel"
              options={ENGLISH_PROFICIENCY_LEVEL_OPTIONS}
            />

            <CardSubtitle>
              Qual a expectativa de atuação profissional após a conclusão do
              curso?
            </CardSubtitle>

            <FormRadioGroup
              control={control}
              name="workExpectation"
              options={WORK_EXPECTATION_OPTIONS}
            />

            <CardSubtitle>Tem preferência pelo período noturno?</CardSubtitle>

            <FormRadioGroup
              control={control}
              name="nocturnalPreference"
              options={BOOLEAN_OPTIONS}
            />

            <CardSubtitle>
              Sabe a diferença entre os cursos correlatos?
            </CardSubtitle>

            <FormRadioGroup
              control={control}
              name="knowRelatedCourseDifference"
              options={BOOLEAN_OPTIONS}
            />

            <CardSubtitle>Analisou o projeto pedagógico do curso?</CardSubtitle>

            <FormRadioGroup
              control={control}
              name="readPedagogicalProject"
              options={BOOLEAN_OPTIONS}
            />

            <CardSubtitle>
              Qual o nível de afinidade com as matérias abaixo?
            </CardSubtitle>

            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[0].affinityLevel"
                direction="row"
                label="Matemática:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[1].affinityLevel"
                direction="row"
                label="Português:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[2].affinityLevel"
                direction="row"
                label="Química:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[3].affinityLevel"
                direction="row"
                label="História:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[4].affinityLevel"
                direction="row"
                label="Física:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[5].affinityLevel"
                direction="row"
                label="Geografia:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[6].affinityLevel"
                direction="row"
                label="Biologia:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[7].affinityLevel"
                direction="row"
                label="Inglês:"
                options={AFFINITY_LEVEL_OPTIONS}
              />

              <FormRadioGroup
                control={control}
                name="affinityByDisciplines[8].affinityLevel"
                direction="row"
                label="Tecnologia:"
                options={AFFINITY_LEVEL_OPTIONS}
              />
            </div>

            <CardSubtitle>Quais hábitos ou hobbies você tem?</CardSubtitle>

            <FormCheckbox
              control={control}
              name="hobbyOrHabits"
              options={HOBBY_OR_HABITS_OPTIONS}
            />

            <CardSubtitle>
              Quais os motivos para a escolha da UNIFEI?
            </CardSubtitle>

            <FormCheckbox
              control={control}
              name="universityChoiceReasons"
              options={UNIVERSITY_CHOICE_REASONS_OPTIONS}
            />

            <CardSubtitle>
              Porque optou pelo curso de Ciência da Computação?
            </CardSubtitle>

            <FormCheckbox
              control={control}
              name="courseChoiceReasons"
              cols="three"
              options={COURSE_CHOICE_REASONS_OPTIONS}
            />

            <CardSubtitle>Quais tecnologias você domina?</CardSubtitle>

            <FormCheckbox
              control={control}
              name="technologies"
              cols="three"
              options={TECHNOLOGIES_OPTIONS}
            />

            <CardSubtitle>Quais bens e recursos você possui?</CardSubtitle>

            <FormCheckbox
              control={control}
              name="assets"
              cols="four"
              options={ASSETS_OPTIONS}
            />

            <Button className="max-w-56" size="lg" isLoading={isSubmitting}>
              <PaperPlaneTiltIcon />
              Enviar
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
