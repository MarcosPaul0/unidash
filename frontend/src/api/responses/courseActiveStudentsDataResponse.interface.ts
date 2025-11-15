import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseActiveStudentsDataResponse {
  courseActiveStudentsData: {
    id: string;
    year: number;
    semester: Semester;
    activeStudents: {
      ingressYear: number;
      numberOfStudents: number;
    }[];
    createdAt: string;
  };
}

export interface CourseActiveStudentsDataListResponse {
  courseActiveStudentsData: {
    id: string;
    year: number;
    semester: Semester;
    activeStudents: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
