import { Injectable } from '@nestjs/common';
// import { CreateRoundDto } from './dto/create-round.dto';
// import { UpdateRoundDto } from './dto/update-round.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Rounds, Prisma } from '@prisma/client';
import { SocketGateway } from 'src/socket/socket.gateway';

const include: any = {
  calendarsBattles: true,
  actions: true,
}

@Injectable()
export class RoundsService {
  constructor(private prisma: PrismaService, private socketService: SocketGateway) { }

  async create(createRoundDto: any) {
    const newCreateRoundDto = {
      data: createRoundDto,
      include,
    };

    if (createRoundDto.calendarsBattles) {
      const idCalendarsBattles = createRoundDto.calendarsBattles.id
      delete (createRoundDto.calendarsBattles)
      newCreateRoundDto.data = {
        ...newCreateRoundDto.data,
        calendarsBattles: {
          connect: {
            id: idCalendarsBattles
          }
        }
      }
    }

    const newRound = await this.prisma.rounds.create(newCreateRoundDto);
    this.socketService.emitRoundAdded(newRound);
    return newRound
  }

  async update_all(idCalendarsBattles: string, createRoundDto: any) {
    await Promise.all(createRoundDto.delete?.map(({ id }: any) => {
      return this.remove(id);
    }))

    await Promise.all(createRoundDto.newOrPut?.map(async (item: any) => {
      if (item.new) {
        delete item.new;
        await this.create(item)
      } else {
        delete item.actions
        await this.update(item.id, item)
      }
    }))

    const req = {
      where: { calendarsBattlesId: idCalendarsBattles },
      include,
      orderBy: {
        order: 'asc'
      },
    } as any;

    return this.findAll(req)
  }

  async active(idRounds: string) {
    const oneRound:any = await this.findOne(idRounds);
    oneRound.active = true;
    delete oneRound.actions;
    return this.update(idRounds, oneRound);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoundsWhereUniqueInput;
    where?: Prisma.RoundsWhereInput;
    orderBy?: Prisma.RoundsOrderByWithRelationInput;
  }): Promise<Rounds[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.rounds.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(id: string) {
    return this.prisma.rounds.findUnique({
      where: { id },
      include,
    });
  }

  update(id: string, updateRoundDto: any) {
    const newCreateRoundDto = {
      data: updateRoundDto,
      include,
    }

    if (updateRoundDto.calendarsBattles) {
      const idCalendarsBattles = updateRoundDto.calendarsBattles.id
      delete (updateRoundDto.calendarsBattles)
      newCreateRoundDto.data = {
        ...newCreateRoundDto.data,
        calendarsBattles: {
          connect: {
            id: idCalendarsBattles
          }
        }
      }
    }
    return this.prisma.rounds.update({
      where: { id },
      data: updateRoundDto,
      include,
    });
  }

  remove(id: string) {
    return this.prisma.rounds.delete({
      where: { id },
      include,
    });
  }
}
