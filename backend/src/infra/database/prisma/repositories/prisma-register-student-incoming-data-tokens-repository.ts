import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterStudentIncomingDataTokensRepository } from '@/domain/application/repositories/register-student-incoming-data-tokens-repository';
import { RegisterStudentIncomingDataToken } from '@/domain/entities/register-student-incoming-data-token';
import { PrismaRegisterStudentIncomingDataTokenMapper } from '../mappers/prisma-register-student-incoming-data-token-mapper copy';

@Injectable()
export class PrismaRegisterStudentIncomingDataTokensRepository
  implements RegisterStudentIncomingDataTokensRepository
{
  constructor(private prisma: PrismaService) {}

  async findByToken(token: string): Promise<RegisterStudentIncomingDataToken | null> {
    const registerStudentIncomingDataToken = await this.prisma.userActionToken.findUnique(
      {
        where: {
          token,
          actionType: 'registerStudentIncomingData',
        },
      },
    );

    if (!registerStudentIncomingDataToken) {
      return null;
    }

    return PrismaRegisterStudentIncomingDataTokenMapper.toDomain(registerStudentIncomingDataToken);
  }

  async create(registerStudentIncomingDataToken: RegisterStudentIncomingDataToken): Promise<void> {
    const data = PrismaRegisterStudentIncomingDataTokenMapper.toPrisma(
      registerStudentIncomingDataToken,
    );

    await this.prisma.userActionToken.create({
      data,
    });
  }

  async deleteManyByUserId(userId: string): Promise<void> {
    await this.prisma.userActionToken.deleteMany({
      where: {
        userId,
        actionType: 'registerStudentIncomingData',
      },
    });
  }
}
