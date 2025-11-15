import { EmploymentType } from "../dtos/courseInternshipData.dto";
import { SEMESTER, Semester } from "../dtos/courseStudentsData.dto";
import {
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

export type SemestersIndicators = {
  hasDataInFirstSemester: boolean;
  hasDataInSecondSemester: boolean;
  data: {
    type: string;
    firstSemester: number;
    secondSemester: number;
    total: number;
  }[];
};

export type SemestersIndicatorByYear = Record<string, SemestersIndicators>;

export type CourseStudents = {
  entrants: number;
  vacancies: number;
  subscribers: number;
};

export type ActiveStudentsByIngress = {
  total: number;
  data: {
    ingressYear: number;
    numberOfStudents: number;
  }[];
};

export type CourseComplements = {
  successRate: number;
  dropoutRate: number;
  applicantsToSeatRatio: number;
  occupancyRate: number;
};

export interface CourseIndicatorsResponse {
  departures: SemestersIndicatorByYear;
  registrationLocks: SemestersIndicatorByYear;
  students: Record<string, CourseStudents[]>;
  activeStudents: Record<string, ActiveStudentsByIngress>;
  teachersWorkload: SemestersIndicatorByYear;
  complements: Record<string, CourseComplements>;
}

export interface ActionPlans {
  [SEMESTER.first]?: {
    academicActionPlans?: string;
    administrativeActionPlans?: string;
  };
  [SEMESTER.second]?: {
    academicActionPlans?: string;
    administrativeActionPlans?: string;
  };
}

export interface CourseCoordinationIndicatorsResponse {
  meetings: {
    year: number;
    meetingsByBoardOfDirectors: number;
    meetingsByUndergraduateChamber: number;
    meetingsByCourseCouncil: number;
    meetingsByNde: number;
  }[];
  services: {
    year: number;
    servicesRequestsBySystem: number;
    servicesRequestsByEmail: number;
  }[];
  actions: {
    year: number;
    resolutionActions: number;
    administrativeDecisionActions: number;
  }[];
  actionPlans: Record<string, ActionPlans>;
  period: number[];
}

export interface WorkStatus {
  semester: Semester;
  enrollments: number;
  defenses: number;
  abandonments: number;
}

export interface OrientationsByTeacher {
  approved: number;
  failed: number;
  teacher: string;
}

export interface CourseWorkCompletionIndicatorsResponse {
  worksStatus: Record<string, WorkStatus[]>;
  orientationsByTeacher: Record<string, OrientationsByTeacher[]>;
}

export type ActivitiesIndicators = {
  total: number;
  data: {
    type: string;
    firstSemester: number;
    secondSemester: number;
    total: number;
  }[];
};

export interface CourseActivitiesIndicatorsResponse {
  extensionActivities: Record<string, ActivitiesIndicators>;
  extensionComplementaryActivities: Record<string, ActivitiesIndicators>;
  searchComplementaryActivities: Record<string, ActivitiesIndicators>;
  teachingComplementaryActivities: Record<string, ActivitiesIndicators>;
}

export type InternshipByCity = { city: string; count: number };

export type InternshipByEmploymentType = {
  employmentType: EmploymentType;
  count: number;
};

export type InternshipByRole = { role: string; count: number };

export type InternshipByAdvisor = { city: string; count: number };

export type InternshipByConclusionTime = {
  averageTimeInDays: number;
  maxTimeInDays: number;
  minTimeInDays: number;
};

export interface CourseInternshipIndicatorsResponse {
  internshipsByCity: Record<string, InternshipByCity[]>;
  internshipsByEmploymentType: Record<string, InternshipByEmploymentType[]>;
  internshipsByRole: Record<string, InternshipByRole[]>;
  internshipsByAdvisor: Record<string, InternshipByAdvisor[]>;
  internshipsByConclusionTime: Record<string, InternshipByConclusionTime>;
}

export type ProductionByTeacher = {
  teacher: string;
  periodicals: number;
  congress: number;
  booksChapter: number;
  programs: number;
  abstracts: number;
  total: number;
};

export type ProductionByType = {
  type: string;
  count: number;
};

export type ProjectsByTeacher = {
  teacher: string;
  extensionProjects: number;
  researchProjects: number;
};

export interface CourseTeacherProductionsIndicatorsResponse {
  technicalScientificProductionsByTeacher: Record<
    string,
    ProductionByTeacher[]
  >;
  technicalScientificProductionsByType: Record<string, ProductionByType[]>;
  researchAndExtensionProjectsByTeacher: Record<string, ProjectsByTeacher[]>;
}

export type IncomingEnglishProficiencyLevel = {
  englishLevel: EnglishProficiencyLevel;
  count: number;
};

export type IncomingCurrentEducation = {
  type: CurrentEducation;
  count: number;
};

export type IncomingWorkExpectation = {
  type: WorkExpectation;
  count: number;
};

export type IncomingCourseComplements = {
  question: string;
  yes: number;
  no: number;
};

export type IncomingAffinityByDiscipline = {
  discipline: HighSchoolDiscipline;
  high: number;
  medium: number;
  low: number;
};

export type IncomingAsset = {
  asset: Asset;
  count: number;
};

export type IncomingCourseChoiceReason = {
  choiceReason: CourseChoiceReason;
  count: number;
};

export type IncomingHobbyOrHabit = {
  hobbyOrHabit: HobbyOrHabit;
  count: number;
};

export type IncomingTechnology = {
  technology: Technology;
  count: number;
};

export type IncomingUniversityChoiceReason = {
  choiceReason: UniversityChoiceReason;
  count: number;
};

export const COURSE_AND_UNIVERSITY_CHOICE = {
  universityAndCourseIsNotFirstChoice: "universityAndCourseIsNotFirstChoice",
  universityIsNotFirstChoice: "universityIsNotFirstChoice",
  courseIsNotFirstChoice: "courseIsNotFirstChoice",
  universityAndCourseIsFirstChoice: "universityAndCourseIsFirstChoice",
} as const;

export type CourseAndUniversityChoice =
  (typeof COURSE_AND_UNIVERSITY_CHOICE)[keyof typeof COURSE_AND_UNIVERSITY_CHOICE];

export type IncomingCourseAndUniversityChoiceDistribution = {
  choiceClassification: CourseAndUniversityChoice;
  count: number;
};

export interface CourseStudentIncomingIndicatorsResponse {
  studentIncomingByEnglishProficiencyLevel: Record<
    string,
    IncomingEnglishProficiencyLevel[]
  >;
  studentIncomingByCurrentEducation: Record<string, IncomingCurrentEducation[]>;
  studentIncomingByWorkExpectation: Record<string, IncomingWorkExpectation[]>;
  studentIncomingByCourseComplements: Record<
    string,
    IncomingCourseComplements[]
  >;
  studentIncomingByAffinityByDiscipline: Record<
    string,
    IncomingAffinityByDiscipline[]
  >;
  studentIncomingByAsset: Record<string, IncomingAsset[]>;
  studentIncomingByCourseChoiceReason: Record<
    string,
    IncomingCourseChoiceReason[]
  >;
  studentIncomingByHobbyOrHabit: Record<string, IncomingHobbyOrHabit[]>;
  studentIncomingByTechnology: Record<string, IncomingTechnology[]>;
  studentIncomingByUniversityChoiceReason: Record<
    string,
    IncomingUniversityChoiceReason[]
  >;
  studentIncomingCourseAndUniversityChoiceDistribution: Record<
    string,
    IncomingCourseAndUniversityChoiceDistribution[]
  >;
}
