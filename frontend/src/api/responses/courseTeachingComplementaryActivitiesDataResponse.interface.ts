import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseTeachingComplementaryActivitiesDataResponse {
  courseTeachingComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    subjectMonitoring: number;
    sponsorshipOfNewStudents: number;
    providingTraining: number;
    coursesInTheArea: number;
    coursesOutsideTheArea: number;
    electivesDisciplines: number;
    complementaryCoursesInTheArea: number;
    preparationForTest: number;
    createdAt: string;
  };
}

export interface CourseTeachingComplementaryActivitiesListDataResponse {
  courseTeachingComplementaryActivitiesData: {
    id: string;
    year: number;
    semester: Semester;
    subjectMonitoring: number;
    sponsorshipOfNewStudents: number;
    providingTraining: number;
    coursesInTheArea: number;
    coursesOutsideTheArea: number;
    electivesDisciplines: number;
    complementaryCoursesInTheArea: number;
    preparationForTest: number;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
