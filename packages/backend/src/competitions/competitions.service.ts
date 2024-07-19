import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Prisma, Competitions } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { InvitedJudgesService } from 'src/invited-judges/invited-judges.service';
import { EmailService } from 'src/email/email.service';

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
          judges: {
            include: {
              photos: true,
              invitedJudges: true,
            }
          }
        }
      },
    },
  },
  invitedJudges: {
    where: {
      accept: true,
    },
    include: {
      judges: {
        include: {
          photos: true,
        },
      }
    }
  },
  competitors: true,
}

@Injectable()
export class CompetitionsService {
  constructor(
    private prisma: PrismaService, private invited_judges: InvitedJudgesService,
    private emailService: EmailService,
  ) { }

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
          accept: !validation
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

    const newCompetitions = await this.prisma.competitions.create(newCreateCompetitionDto);

    // if (validation) {
    //   console.log("Send mail");
    //   await Promise.all(newCompetitions.invitedJudges.map(({ judgesId, competitionsId }: any) => {
    //     console.log("url:", `http://localhost:4000/invited-judges/validationJudges/${competitionsId}/${judgesId}`)
    //     // return this.emailService.validationEmail(
    //     //   {
    //     //     name: 'Nantenaina 2',
    //     //     email: "andrianantenaina321@gmail.com",
    //     //     otp: '****', // generate a random OTP
    //     //   })
    //   }));
    // }

    if (validation) {
      await Promise.all(newCompetitions.invitedJudges.map(async (invitedJudge: any) => {
        const { judgesId, competitionsId } = invitedJudge;
        const judge = await this.prisma.judges.findUnique({ where: { id: judgesId } });
        const url = `http://localhost:4000/invited-judges/validationJudges/${competitionsId}/${judgesId}`;
        console.log("url:", `http://localhost:4000/invited-judges/validationJudges/${competitionsId}/${judgesId}`)
        if (judge && judge.email) {
          return this.emailService.sendConfirmeUrlEmail({
            to: judge.email,
            subject: 'Validation de participation',
            url
          });
        }
      }));
    }
    
    return newCompetitions;
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
