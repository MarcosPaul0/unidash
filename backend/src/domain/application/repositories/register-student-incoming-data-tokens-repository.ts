import { RegisterStudentIncomingDataToken } from '@/domain/entities/register-student-incoming-data-token';

export abstract class RegisterStudentIncomingDataTokensRepository {
  abstract findByToken(token: string): Promise<RegisterStudentIncomingDataToken | null>

  abstract create(registerStudentIncomingDataToken: RegisterStudentIncomingDataToken): Promise<void>

  abstract deleteManyByUserId(userId: string): Promise<void>
}
