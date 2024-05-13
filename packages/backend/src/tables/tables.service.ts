import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateTableDto } from './dto/create-table.dto';
// import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Tables } from '@prisma/client';

const include: any = {
  calendarsBattles: {
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      rounds: true,
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
  },
}

@Injectable()
export class TablesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createTableDto: any) {
    const newCreateTableDto = {
      data: createTableDto,
      include,
    } as any;

    const oneTable: any = await this.prisma.tables.findMany({
      where: { name: createTableDto.name },
    });

    if (oneTable?.length !== 0) {
      throw new HttpException('Name already exist', HttpStatus.UNAUTHORIZED);
    }


    if (createTableDto.competitions) {
      const idCompetitions = createTableDto.competitions.id
      delete (createTableDto.competitions)
      newCreateTableDto.data = {
        ...createTableDto,
        competitions: {
          connect: {
            id: idCompetitions
          }
        }
      }
    }

    return this.prisma.tables.create(newCreateTableDto);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TablesWhereUniqueInput;
    where?: Prisma.TablesWhereInput;
    orderBy?: Prisma.TablesOrderByWithRelationInput;
  }): Promise<Tables[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const request = {
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    } as any;
    return this.prisma.tables.findMany(request);
  }

  async findAllCompetitions(user: any, id: string): Promise<Tables[]> {
    const request = {
      where: {
        competitions: {
          id
        }
      },
      include,
    } as any;
    let response = await this.prisma.tables.findMany(request);
    if (!user.admins) {
      response = response.map((r: any) => {
        const newCalandarsBattles = []
        r.calendarsBattles.map((calendarsBattle: any) => {
          if (calendarsBattle.competitors.find(({ id }) => id == user.id)) {
            newCalandarsBattles.push(calendarsBattle)
          }
        })
        r.calendarsBattles = newCalandarsBattles;
        return r;
      });
    }
    return response;
  }

  async findOne(id: string) {
    const request = {
      where: { id },
      include,
    } as any;
    const user: any = await this.prisma.tables.findMany(request);
    return user;
  }

  update(id: string, updateTablesDto: any) {
    const request = {
      where: { id },
      data: updateTablesDto,
      include,
    } as any;
    return this.prisma.tables.update(request);
  }

  remove(id: string) {
    const request = {
      where: { id },
      include,
    } as any;
    return this.prisma.tables.delete(request);
  }
}
