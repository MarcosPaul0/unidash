import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseExtensionComplementaryActivitiesDataResponse {
  courseExtensionComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    culturalActivities: number;
    sportsCompetitions: number;
    awardsAtEvents: number;
    studentRepresentation: number;
    participationInCollegiateBodies: number;
    createdAt: string;
  };
}

export interface CourseExtensionComplementaryActivitiesListDataResponse {
  courseExtensionComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    culturalActivities: number;
    sportsCompetitions: number;
    awardsAtEvents: number;
    studentRepresentation: number;
    participationInCollegiateBodies: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
