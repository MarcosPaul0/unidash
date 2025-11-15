import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseTeacherWorkloadDataResponse {
  courseTeacherWorkloadData: {
    id: string;
    year: number;
    courseId: string;
    semester: Semester;
    teacherName: string;
    teacherId: string;
    workloadInHours: number;
    createdAt: string;
  };
}

export interface CourseTeacherWorkloadListDataResponse {
  courseTeacherWorkloadData: {
    id: string;
    year: number;
    semester: Semester;
    teacherName: string;
    workloadInHours: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
