import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseSearchComplementaryActivitiesDataResponse {
  courseSearchComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    scientificInitiation: number;
    developmentInitiation: number;
    publishedArticles: number;
    fullPublishedArticles: number;
    publishedAbstracts: number;
    presentationOfWork: number;
    participationInEvents: number;
    createdAt: string;
  };
}

export interface CourseSearchComplementaryActivitiesListDataResponse {
  courseSearchComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    scientificInitiation: number;
    developmentInitiation: number;
    publishedArticles: number;
    fullPublishedArticles: number;
    publishedAbstracts: number;
    presentationOfWork: number;
    participationInEvents: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
