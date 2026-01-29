import {
  UserActionToken as PrismaUserActionToken,
  Prisma,
} from '@prisma/client';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { RegisterStudentIncomingDataToken } from '@/domain/entities/register-student-incoming-data-token';

export class PrismaRegisterStudentIncomingDataTokenMapper {
  static toDomain(raw: PrismaUserActionToken): RegisterStudentIncomingDataToken {
    return RegisterStudentIncomingDataToken.create(
      {
        expiresAt: raw.expiresAt,
        token: raw.token,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(
    registerStudentIncomingDataToken: RegisterStudentIncomingDataToken,
  ): Prisma.UserActionTokenUncheckedCreateInput {
    return {
      id: registerStudentIncomingDataToken.id.toString(),
      actionType: registerStudentIncomingDataToken.actionType,
      token: registerStudentIncomingDataToken.token,
      userId: registerStudentIncomingDataToken.userId.toString(),
      expiresAt: registerStudentIncomingDataToken.expiresAt,
      createdAt: registerStudentIncomingDataToken.createdAt,
    };
  }
}
