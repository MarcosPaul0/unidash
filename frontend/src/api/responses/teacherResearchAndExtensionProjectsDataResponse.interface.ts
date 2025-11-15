import { Semester } from "../dtos/courseStudentsData.dto";

export interface TeacherResearchAndExtensionProjectsDataResponse {
  teacherResearchAndExtensionProjectsData: {
    id: string;
    year: number;
    teacherId: string;
    courseId: string;
    semester: Semester;
    extensionProjects: number;
    researchProjects: number;
    createdAt: string;
    teacherName?: string;
    teacherEmail?: string;
  }[];
  totalItems: number;
  totalPages: number;
}
