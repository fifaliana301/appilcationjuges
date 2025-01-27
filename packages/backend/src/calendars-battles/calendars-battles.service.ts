import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateCalendarsBattleDto } from './dto/create-calendars-battle.dto';
// import { UpdateCalendarsBattleDto } from './dto/update-calendars-battle.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, CalendarsBattles } from '@prisma/client';

const include: any = {
  rounds: {
    include: {
      actions: true
    }
  },
  competitors: {
    include: {
      photos: true
    }
  },
  tables: true,
  judges: {
    include: {
      photos: true
    }
  }
}
@Injectable()
export class CalendarsBattlesService {

  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createCalendarsBattleDto: any) {
    const entities = ["tables", "judges", "competitors"];
    const newCreateCalendarsBattleDto = {
      data: createCalendarsBattleDto,
      include,
    }

    await Promise.all(entities.map(async (entitie: any) => {
      if (createCalendarsBattleDto[entitie]) {
        let idEntitie: any;
        if (createCalendarsBattleDto[entitie].id) {
          const idd = await (this.prisma[entitie] as any)?.findUnique({ where: { id: createCalendarsBattleDto[entitie].id } })
          if (!idd) {
            throw new HttpException(`${entitie} not found`, HttpStatus.NOT_FOUND);
          }
          idEntitie = { id: createCalendarsBattleDto[entitie].id }
        } else {
          idEntitie = await Promise.all(createCalendarsBattleDto[entitie].ids.map(async (e: any) => {
            const idd = await (this.prisma[entitie] as any)?.findUnique({ where: { id: e } })
            if (!idd) {
              throw new HttpException(`${entitie} not found`, HttpStatus.NOT_FOUND);
            }
            return ({ id: e })
          }))
        }
        delete (createCalendarsBattleDto[entitie])
        newCreateCalendarsBattleDto.data = {
          ...newCreateCalendarsBattleDto.data,
          [entitie]: {
            connect: idEntitie
          }
        }
      } else {
        throw new HttpException(`${entitie} is required`, HttpStatus.UNAUTHORIZED);
      }
    }))

    const response = await this.prisma.calendarsBattles.create(newCreateCalendarsBattleDto);
    // console.log("response", response);
    return response;
  }

  // JUDGE
  async addJudgesToCalendarsBattles({ idJudges, idCalendarsBattles }: any) {
    const judge: any = await this.prisma.judges.findFirst({ where: { id: idJudges } });
    const calendarsBattles: any = await this.prisma.calendarsBattles.update({
      where: {
        id: idCalendarsBattles
      },
      data: {
        judges: {
          connect: {
            id: judge.id
          },
        }
      },
      include,
    });
    return calendarsBattles
  }

  async deleteJudgesToCalendarsBattles({ idJudges, idCalendarsBattles }: any) {
    const judge: any = await this.prisma.judges.findFirst({ where: { id: idJudges } });
    const calendarsBattles: any = await this.prisma.calendarsBattles.update({
      where: {
        id: idCalendarsBattles
      },
      data: {
        judges: {
          disconnect: {
            id: judge.id
          },
        }
      },
      include,
    });
    return calendarsBattles
  }

  // COMPETITORS
  async addCompetitorsToCalendarsBattles({ idCompetitors, idCalendarsBattles }: any) {
    const competitors: any = await this.prisma.competitors.findFirst({ where: { id: idCompetitors } });
    const calendarsBattles: any = await this.prisma.calendarsBattles.findFirst({ where: { id: idCalendarsBattles } });
    if (!calendarsBattles) {
      throw new HttpException(`calendarsBattles not found`, HttpStatus.NOT_FOUND);
    }

    const res: any = await this.prisma.calendarsBattles.update({
      where: {
        id: idCalendarsBattles
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
    return res
  }

  async deleteCompetitorsToCalendarsBattles({ idCompetitors, idCalendarsBattles }: any) {
    const competitors: any = await this.prisma.judges.findFirst({ where: { id: idCompetitors } });
    const calendarsBattles: any = await this.prisma.calendarsBattles.update({
      where: {
        id: idCalendarsBattles
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
    return calendarsBattles
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CalendarsBattlesWhereUniqueInput;
    where?: Prisma.CalendarsBattlesWhereInput;
    orderBy?: Prisma.CalendarsBattlesOrderByWithRelationInput;
  }): Promise<CalendarsBattles[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.calendarsBattles.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findOne(id: string) {
    const user: any = await this.prisma.calendarsBattles.findMany({
      where: { id },
      include,
    });
    return user;
  }

  async update(id: string, updateCalendarsBattlesDto: any) {
    delete (updateCalendarsBattlesDto.id)
    delete (updateCalendarsBattlesDto.tables)
    // return this.prisma.calendarsBattles.update({
    //   where: { id },
    //   data: updateCalendarsBattlesDto,
    //   include,
    // });
    const entities = ["judges", "competitors"];
    const newCreateCalendarsBattleDto = {
      where: { id },
      data: updateCalendarsBattlesDto,
      include,
    }

    // Étape 1: Dissocier les anciennes relations
    await Promise.all(entities.map(async (entitie: any) => {
      const existingRelation: any = await this.prisma.calendarsBattles.findUnique({
        where: { id },
        include,
      });

      if (existingRelation && existingRelation[entitie]) {
        await this.prisma.calendarsBattles.update({
          where: { id },
          data: {
            [entitie]: {
              disconnect: existingRelation[entitie].map((item: any) => ({ id: item.id })), // Dissocier chaque entité
            },
          },
        });
      }
    }));

    console.log(updateCalendarsBattlesDto)
    await Promise.all(entities.map(async (entitie: any) => {
      if (updateCalendarsBattlesDto[entitie]) {
        console.log(entitie, updateCalendarsBattlesDto[entitie])
        let idEntitie: any;
        // if (updateCalendarsBattlesDto[entitie].id) {
        //   const idd = await (this.prisma[entitie] as any)?.findUnique({ where: { id: updateCalendarsBattlesDto[entitie].id } })
        //   if (!idd) {
        //     throw new HttpException(`${entitie} not found`, HttpStatus.NOT_FOUND);
        //   }
        //   idEntitie = { id: updateCalendarsBattlesDto[entitie].id }
        // } else {
        idEntitie = await Promise.all(updateCalendarsBattlesDto[entitie].ids.map(async (e: any) => {
          const idd = await (this.prisma[entitie] as any)?.findUnique({ where: { id: e } })
          if (!idd) {
            throw new HttpException(`${entitie} not found`, HttpStatus.NOT_FOUND);
          }
          return ({ id: e })
        }))
        // }
        delete (updateCalendarsBattlesDto[entitie])
        newCreateCalendarsBattleDto.data = {
          ...newCreateCalendarsBattleDto.data,
          [entitie]: {
            connect: idEntitie
          }
        }
      } else {
        throw new HttpException(`${entitie} is required`, HttpStatus.UNAUTHORIZED);
      }
    }))

    console.log(newCreateCalendarsBattleDto)
    const response = await this.prisma.calendarsBattles.update(newCreateCalendarsBattleDto);
    console.log("response", response);
    // return newCreateCalendarsBattleDto
    return response;
  }

  remove(id: string) {
    console.log("delete calendars-battles", id)
    return this.prisma.calendarsBattles.delete({
      where: { id },
      include,
    });
  }
}
