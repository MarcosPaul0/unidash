import { Semester } from "../dtos/courseStudentsData.dto";

export interface TeacherTechnicalScientificProductionsDataResponse {
  teacherTechnicalScientificProductionsData: {
    id: string;
    year: number;
    teacherId: string;
    courseId: string;
    semester: Semester;
    periodicals: number;
    congress: number;
    booksChapter: number;
    programs: number;
    abstracts: number;
    createdAt: string;
    teacherName?: string;
    teacherEmail?: string;
  }[];
  totalItems: number;
  totalPages: number;
}
