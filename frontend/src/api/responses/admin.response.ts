export const USER_ROLE = {
  teacher: "teacher",
  student: "student",
  admin: "admin",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface AdminResponse {
  admin: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    accountActivatedAt?: Date | null;
    createdAt: Date;
    updatedAt?: Date | null;
  };
}
