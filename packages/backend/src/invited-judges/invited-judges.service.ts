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

  update(idJudges: string, idCompetitions: string, updateInvitedJudgeDto: UpdateInvitedJudgeDto) {
    return `This action updates a #${idJudges} invitedJudge`;
  }

  async remove(idJudges: string, idCompetitions: string) {
    const stock = await this.findOne(idJudges, idCompetitions)
    console.log(stock)
    if (!stock.length) {
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
}
