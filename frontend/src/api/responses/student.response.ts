import { UserRole } from "./admin.response";

export const STUDENT_TYPE = {
  incomingStudent: "incomingStudent",
  outgoingStudent: "outgoingStudent",
} as const;

export type StudentType = (typeof STUDENT_TYPE)[keyof typeof STUDENT_TYPE];

export interface StudentResponse {
  student: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    accountActivatedAt?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    courseId: string;
    matriculation: string;
    type: StudentType;
  };
}

export interface StudentsResponse {
  students: StudentResponse["student"][];
  totalItems: number;
  totalPages: number;
}
