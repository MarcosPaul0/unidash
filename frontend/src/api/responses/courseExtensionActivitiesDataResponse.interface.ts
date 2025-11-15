import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseExtensionActivitiesDataResponse {
  courseExtensionActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    specialProjects: number;
    participationInCompetitions: number;
    entrepreneurshipAndInnovation: number;
    eventOrganization: number;
    externalInternship: number;
    cultureAndExtensionProjects: number;
    semiannualProjects: number;
    workNonGovernmentalOrganization: number;
    juniorCompanies: number;
    provisionOfServicesWithSelfEmployedWorkers: number;
    createdAt: string;
  };
}

export interface CourseExtensionActivitiesListDataResponse {
  courseExtensionActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    specialProjects: number;
    participationInCompetitions: number;
    entrepreneurshipAndInnovation: number;
    eventOrganization: number;
    externalInternship: number;
    cultureAndExtensionProjects: number;
    semiannualProjects: number;
    workNonGovernmentalOrganization: number;
    juniorCompanies: number;
    provisionOfServicesWithSelfEmployedWorkers: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
