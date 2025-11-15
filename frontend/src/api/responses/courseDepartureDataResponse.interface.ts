import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseDepartureDataResponse {
  courseDepartureData: {
    id: string;
    year: number;
    semester: Semester;
    completed: number;
    maximumDuration: number;
    dropouts: number;
    transfers: number;
    withdrawals: number;
    removals: number;
    newExams: number;
    deaths: number;
    createdAt: string;
  };
}

export interface CourseDepartureListDataResponse {
  courseDepartureData: {
    id: string;
    year: number;
    semester: Semester;
    completed: number;
    maximumDuration: number;
    dropouts: number;
    transfers: number;
    withdrawals: number;
    removals: number;
    newExams: number;
    deaths: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
