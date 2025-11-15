import { Semester } from "../dtos/courseStudentsData.dto";

export interface TeacherSupervisedCompletionWorkDataResponse {
  teacherSupervisedCompletionWorkData: {
    id: string;
    year: number;
    teacherId: string;
    courseId: string;
    semester: Semester;
    approved: number;
    failed: number;
    createdAt: string;
    teacherName?: string;
    teacherEmail?: string;
  }[];
  totalItems: number;
  totalPages: number;
}
