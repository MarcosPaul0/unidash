import { EmploymentType } from "../dtos/courseInternshipData.dto";
import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseInternshipDataResponse {
  courseInternshipData: {
    id: string;
    year: number;
    semester: Semester;
    studentMatriculation: string;
    enterpriseCnpj: string;
    role: string;
    conclusionTimeInDays: number;
    cityId: string;
    cityName: string;
    advisorId: string;
    advisorName: string;
    employmentType: EmploymentType;
    createdAt: string;
  };
}

export interface CourseInternshipListDataResponse {
  courseInternshipData: {
    id: string;
    year: number;
    semester: Semester;
    studentMatriculation: string;
    enterpriseCnpj: string;
    role: string;
    conclusionTimeInDays: number;
    cityId: string;
    cityName: string;
    advisorId: string;
    advisorName: string;
    employmentType: EmploymentType;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
