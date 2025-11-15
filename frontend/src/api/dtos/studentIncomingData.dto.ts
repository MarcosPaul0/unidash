import z from "zod";
import { SEMESTER } from "./courseStudentsData.dto";
import { Validator } from "@unidash/utils/validator.util";

export const WORK_EXPECTATION = {
  employmentContract: "employmentContract",
  independentContractor: "independentContractor",
  undecided: "undecided",
  publicSector: "publicSector",
  academicCareer: "academicCareer",
} as const;

export type WorkExpectation =
  (typeof WORK_EXPECTATION)[keyof typeof WORK_EXPECTATION];

export const HIGH_SCHOOL_DISCIPLINE = {
  history: "history",
  geography: "geography",
  portuguese: "portuguese",
  biology: "biology",
  chemical: "chemical",
  mathematics: "mathematics",
  physical: "physical",
  english: "english",
  technology: "technology",
} as const;

export type HighSchoolDiscipline =
  (typeof HIGH_SCHOOL_DISCIPLINE)[keyof typeof HIGH_SCHOOL_DISCIPLINE];

export const AFFINITY_LEVEL = {
  low: "low",
  medium: "medium",
  high: "high",
} as const;

export type AffinityLevel =
  (typeof AFFINITY_LEVEL)[keyof typeof AFFINITY_LEVEL];

export const ASSET = {
  car: "car",
  motorcycle: "motorcycle",
  virtualAssistant: "virtualAssistant",
  payTv: "payTv",
  smartTv: "smartTv",
  printer: "printer",
  internet: "internet",
  tablet: "tablet",
  desktopComputer: "desktopComputer",
  laptop: "laptop",
  smartphone: "smartphone",
} as const;

export type Asset = (typeof ASSET)[keyof typeof ASSET];

export const COURSE_CHOICE_REASON = {
  hobbyRelation: "hobbyRelation",
  financialReasons: "financialReasons",
  courseQuality: "courseQuality",
  sisuPreference: "sisuPreference",
  notFirstChoice: "notFirstChoice",
  higherEducationDesire: "higherEducationDesire",
  professionalUpdate: "professionalUpdate",
  other: "other",
} as const;

export type CourseChoiceReason =
  (typeof COURSE_CHOICE_REASON)[keyof typeof COURSE_CHOICE_REASON];

export const HOBBY_OR_HABIT = {
  videoGames: "videoGames",
  physicalActivity: "physicalActivity",
  listeningMusic: "listeningMusic",
  teamSports: "teamSports",
  moviesOrSeries: "moviesOrSeries",
  reading: "reading",
  internetBrowsing: "internetBrowsing",
  playingInstrument: "playingInstrument",
  socialMedia: "socialMedia",
  traveling: "traveling",
  individualSports: "individualSports",
  handcrafting: "handcrafting",
  other: "other",
} as const;

export type HobbyOrHabit = (typeof HOBBY_OR_HABIT)[keyof typeof HOBBY_OR_HABIT];

export const TECHNOLOGY = {
  internetNavigation: "internetNavigation",
  softwareInstallation: "softwareInstallation",
  programmingAndLanguages: "programmingAndLanguages",
  spreadsheets: "spreadsheets",
  operatingSystemSetup: "operatingSystemSetup",
  textEditor: "textEditor",
  electronicsInstallation: "electronicsInstallation",
  presentationEditing: "presentationEditing",
  videoEditing: "videoEditing",
  drawingApps: "drawingApps",
  prototypingPlatform: "prototypingPlatform",
} as const;

export type Technology = (typeof TECHNOLOGY)[keyof typeof TECHNOLOGY];

export const UNIVERSITY_CHOICE_REASON = {
  reputation: "reputation",
  closePeople: "closePeople",
  publicEducation: "publicEducation",
  professionalReasons: "professionalReasons",
  financialReasons: "financialReasons",
  notFirstChoice: "notFirstChoice",
  closeOriginCity: "closeOriginCity",
  other: "other",
} as const;

export type UniversityChoiceReason =
  (typeof UNIVERSITY_CHOICE_REASON)[keyof typeof UNIVERSITY_CHOICE_REASON];

export const ENGLISH_PROFICIENCY_LEVEL = {
  low: "low",
  intermediate: "intermediate",
  fluent: "fluent",
} as const;

export type EnglishProficiencyLevel =
  (typeof ENGLISH_PROFICIENCY_LEVEL)[keyof typeof ENGLISH_PROFICIENCY_LEVEL];

export const CURRENT_EDUCATION = {
  technicalInField: "technicalInField",
  technicalOutField: "technicalOutField",
  higherInField: "higherInField",
  higherOutField: "higherOutField",
  none: "none",
} as const;

export type CurrentEducation =
  (typeof CURRENT_EDUCATION)[keyof typeof CURRENT_EDUCATION];

export const registerStudentIncomingDataDtoSchema = z.object({
  year: z
    .transform(Number)
    .pipe(z.number().int().min(0).max(new Date().getFullYear())),
  semester: z.enum(SEMESTER),
  workExpectation: z.enum(WORK_EXPECTATION),
  currentEducation: z.enum(CURRENT_EDUCATION),
  englishProficiencyLevel: z.enum(ENGLISH_PROFICIENCY_LEVEL),
  nocturnalPreference: z.boolean(),
  knowRelatedCourseDifference: z.boolean(),
  readPedagogicalProject: z.boolean(),
  affinityByDisciplines: z.array(
    z.object({
      affinityLevel: z.enum(AFFINITY_LEVEL),
      discipline: z.enum(HIGH_SCHOOL_DISCIPLINE),
    })
  ),
  cityId: z.uuid(),
  assets: z.array(z.enum(ASSET)),
  courseChoiceReasons: z.array(z.enum(COURSE_CHOICE_REASON)),
  hobbyOrHabits: z.array(z.enum(HOBBY_OR_HABIT)),
  technologies: z.array(z.enum(TECHNOLOGY)),
  universityChoiceReasons: z.array(z.enum(UNIVERSITY_CHOICE_REASON)),
});

export type RegisterStudentIncomingDataDto = z.infer<
  typeof registerStudentIncomingDataDtoSchema
>;

export const filterStudentIncomingDataDtoSchema = z
  .object({
    year: Validator.validateOptionalYear(),
    semester: z.enum(SEMESTER).optional(),
  })
  .optional();

export type FilterStudentIncomingDataDto = z.infer<
  typeof filterStudentIncomingDataDtoSchema
>;
