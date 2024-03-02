import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateCompetitionDto } from './dto/create-competition.dto';
// import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Competitions } from '@prisma/client';
import { InvitedJudgesService } from 'src/invited-judges/invited-judges.service';

const include: any = {
  tables: {
    include: {
      calendarsBattles: {
        include: {
          rounds: true,
          competitors: {
            include: {
              photos: true,
            }
          },
          tables: true,
          judges: true
        }
      },
    },
  },
  invitedJudges: {
    include: {
      judges: true
    }
  },
  competitors: true,
}

@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService, private invited_judges: InvitedJudgesService) { }

  async create(createCompetitionDto: any) {
    const validation = !!createCompetitionDto.validation
    delete createCompetitionDto.validation;

    const newCreateCompetitionDto = {
      data: createCompetitionDto,
      include,
    }
    if (createCompetitionDto.admins) {
      const idAdmin = createCompetitionDto.admins.id
      if (!this.prisma.admins.findUnique({ where: { id: idAdmin } })) {
        throw new HttpException('Admins not found', HttpStatus.NOT_FOUND);
      }
      delete (createCompetitionDto.admins)
      newCreateCompetitionDto.data = {
        ...newCreateCompetitionDto.data,
        admins: {
          connect: {
            id: idAdmin
          }
        }
      }
    }
    if (createCompetitionDto.judges) {
      let createInviteds = [];
      await Promise.all(createCompetitionDto.judges.map(async (judges: any) => {
        const oneJudges: any = await this.prisma.judges.findUnique({ where: { id: judges } });
        if (!oneJudges) {
          throw new HttpException('Judges not found', HttpStatus.NOT_FOUND);
        }
        createInviteds.push({
          judges: {
            connect: {
              id: oneJudges.id
            }
          },
          accept: validation
        });
      }))
      delete (createCompetitionDto.judges)
      if (createInviteds.length > 0) {
        newCreateCompetitionDto.data = {
          ...createCompetitionDto,
          invitedJudges: {
            create: createInviteds
          }
        }
      }
    }
    return this.prisma.competitions.create(newCreateCompetitionDto);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompetitionsWhereUniqueInput;
    where?: Prisma.CompetitionsWhereInput;
    orderBy?: Prisma.CompetitionsOrderByWithRelationInput;
  }): Promise<Competitions[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.competitions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findOne(id: string) {
    const user: any = await this.prisma.competitions.findMany({
      where: { id },
      include,
    });
    return user;
  }

  async subscriptionCompetitors({ idCompetitions, idCompetitors }: any) {
    const competitors: any = await this.prisma.competitors.findFirst({ where: { id: idCompetitors } });
    const competitions: any = await this.prisma.competitions.update({
      where: {
        id: idCompetitions
      },
      data: {
        competitors: {
          connect: {
            id: competitors.id
          },
        }
      },
      include,
    });
    return competitions
  }

  async unsubscriptionCompetitors({ idCompetions, idCompetitors }: any) {
    const competitors: any = await this.prisma.competitors.findFirst({ where: { id: idCompetitors } });
    const competitions: any = await this.prisma.competitions.update({
      where: {
        id: idCompetions
      },
      data: {
        competitors: {
          disconnect: {
            id: competitors.id
          },
        }
      },
      include,
    });
    return competitions

  }

  async update(id: string, updateCompetitionDto: any) {
    delete updateCompetitionDto.id;

    const validation = !!updateCompetitionDto.validation
    delete updateCompetitionDto.validation;

    const newUpdateCompetitionDto = {
      where: { id },
      data: updateCompetitionDto,
      include,
    }

    if (updateCompetitionDto.admins) {
      const idAdmin = updateCompetitionDto.admins.id
      const oneAdmin = await this.prisma.admins.findUnique({ where: { id: idAdmin } })
      if (!oneAdmin) {
        throw new HttpException('Admins not found', HttpStatus.NOT_FOUND);
      }
      delete (updateCompetitionDto.admins)
      newUpdateCompetitionDto.data = {
        ...newUpdateCompetitionDto.data,
        admins: {
          connect: {
            id: oneAdmin.id
          }
        }
      }
    }

    if (updateCompetitionDto.judges) {
      let createInviteds = [];
      const invitedJudgesListes: any = (await this.invited_judges.findAll({ where: { competitionsId: id } }));
      const invitedJudgesId: any = invitedJudgesListes?.map((e: any) => e.judgesId)

      await Promise.all(updateCompetitionDto.judges.map(async (judges: any) => {
        const oneJudges: any = await this.prisma.judges.findUnique({ where: { id: judges } });
        if (!oneJudges) {
          throw new HttpException('Judges not found', HttpStatus.NOT_FOUND);
        }
        const index = invitedJudgesId.indexOf(oneJudges.id)
        if (index !== -1) {
          invitedJudgesId.splice(index, 1)
        }
        if (index === -1 || invitedJudgesListes[index]?.accept !== validation) {
          createInviteds.push({
            judges: {
              connect: {
                id: oneJudges.id
              }
            },
            accept: validation
          });
        }
      }))

      delete (updateCompetitionDto.judges)
      await Promise.all(invitedJudgesId.map((idJudge: any) => {
        return this.invited_judges.remove(idJudge, id)
      }))
      if (createInviteds.length > 0) {
        newUpdateCompetitionDto.data = {
          ...newUpdateCompetitionDto.data,
          invitedJudges: {
            create: createInviteds
          }
        }
      }
    }
    delete (newUpdateCompetitionDto.data.judges)

    // return newUpdateCompetitionDto;
    return this.prisma.competitions.update(newUpdateCompetitionDto);
  }

  async remove(id: string) {
    const stock = await this.findOne(id)
    if (!stock.length) {
      throw new HttpException('This competition is not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.competitions.delete({
      where: { id },
      include,
    });
  }
}
