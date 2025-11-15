import { Semester } from "../dtos/courseStudentsData.dto";
import {
  AffinityLevel,
  Asset,
  CourseChoiceReason,
  CurrentEducation,
  EnglishProficiencyLevel,
  HighSchoolDiscipline,
  HobbyOrHabit,
  Technology,
  UniversityChoiceReason,
  WorkExpectation,
} from "../dtos/studentIncomingData.dto";

export interface StudentIncomingDataResponse {
  studentIncomingData: {
    id: string;
    year: number;
    semester: Semester;
    studentId: string;
    workExpectation: WorkExpectation;
    currentEducation: CurrentEducation;
    englishProficiencyLevel: EnglishProficiencyLevel;
    nocturnalPreference: boolean;
    knowRelatedCourseDifference: boolean;
    readPedagogicalProject: boolean;
    createdAt: string;
    studentAffinityByDisciplineData: {
      affinityLevel: AffinityLevel;
      discipline: HighSchoolDiscipline;
    }[];
    studentHobbyOrHabitData: {
      hobbyOrHabit: HobbyOrHabit;
      description: string;
    }[];
    studentAssetData: {
      asset: Asset;
      description: string;
    }[];
    studentCourseChoiceReasonData: {
      choiceReason: CourseChoiceReason;
      description: string;
    }[];
    studentUniversityChoiceReasonData: {
      choiceReason: UniversityChoiceReason;
      description: string;
    }[];
    studentTechnologyData: {
      technology: Technology;
      description: string;
    }[];
  }[];
  totalItems: number;
  totalPages: number;
}

export interface CheckIncomingStudentRespondedResponse {
  wasAnswered: boolean;
}
