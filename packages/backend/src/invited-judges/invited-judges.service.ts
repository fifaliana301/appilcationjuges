import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvitedJudgeDto } from './dto/create-invited-judge.dto';
import { UpdateInvitedJudgeDto } from './dto/update-invited-judge.dto';
import { InvitedJudges, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const include: any = {
  judges: true,
  competitions: true
}

@Injectable()
export class InvitedJudgesService {
  constructor(private prisma: PrismaService) { }

  create(createInvitedJudgeDto: CreateInvitedJudgeDto) {
    return 'This action adds a new invitedJudge';
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvitedJudgesWhereUniqueInput;
    where?: Prisma.InvitedJudgesWhereInput;
    orderBy?: Prisma.InvitedJudgesOrderByWithRelationInput;
  }): Promise<InvitedJudges[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invitedJudges.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findByCompetitions(idCompetitions: string) {
    const user: any = await this.prisma.invitedJudges.findMany({
      where: { competitionsId: idCompetitions },
      include,
    });
    return user;
  }

  async findOne(idJudges: string, idCompetitions: string) {
    const user: any = await this.prisma.invitedJudges.findFirst({
      where: { competitionsId: idCompetitions, judgesId: idJudges },
      include,
    });
    return user;
  }

  async remove(idJudges: string, idCompetitions: string) {
    const stock = await this.findOne(idJudges, idCompetitions)
    if (!stock) {
      throw new HttpException('This invited is not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.invitedJudges.delete({
      where: {
        judgesId_competitionsId: {
          competitionsId: idCompetitions,
          judgesId: idJudges
        }
      },
      include,
    });
  }

  update(idJudges: string, idCompetitions: string, updateInvitedJudgeDto: any) {
    delete(updateInvitedJudgeDto.judges)
    delete(updateInvitedJudgeDto.competitions)
    delete(updateInvitedJudgeDto.judgesId)
    delete(updateInvitedJudgeDto.competitionsId)

    updateInvitedJudgeDto.updatedAt = new Date().toISOString();

    const newUpdateInvitedJudgeDto: any = {
      where: {
        judgesId_competitionsId: { judgesId: idJudges, competitionsId: idCompetitions }
      },
      data: updateInvitedJudgeDto,
      include,
    }

    return this.prisma.invitedJudges.update(newUpdateInvitedJudgeDto);
  }

  async validationJudges(idCompetitions: string, idJudges: any) {
    const invitedJudges: any = await this.findOne(idJudges, idCompetitions);
    invitedJudges.accept = true;
    // return newUpdateCompetitionDto;
    return this.update(idJudges, idCompetitions, invitedJudges);
  }
}
