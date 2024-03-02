import { Injectable } from '@nestjs/common';
// import { CreateActionDto } from './dto/create-action.dto';
// import { UpdateActionDto } from './dto/update-action.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Actions, Prisma } from '@prisma/client';

const include: any = {
  rounds: true,
  competitors: true,
  judges: true,
}

@Injectable()
export class ActionsService {
  constructor(private prisma: PrismaService) { }

  create(createActionsDto: any) {
    const keys = ["rounds", "competitors", "judges"];

    delete createActionsDto['id']
    keys.map((key: any) => {
      delete createActionsDto[key + 'Id']
    })

    const newCreateActionsDto = {
      data: createActionsDto,
      include,
    } as any;

    keys.map((key: any) => {
      if (createActionsDto[key]) {
        const id = createActionsDto[key].id
        delete createActionsDto[key]
        newCreateActionsDto.data = {
          ...newCreateActionsDto.data,
          [key]: {
            connect: {
              id: id
            }
          }
        }
      }
    })

    return this.prisma.actions.create(newCreateActionsDto);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActionsWhereUniqueInput;
    where?: Prisma.ActionsWhereInput;
    orderBy?: Prisma.ActionsOrderByWithRelationInput;
  }): Promise<Actions[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.actions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include,
    });
  }

  findOne(id: string) {
    const query = {
      where: { id },
      include,
    } as any;
    return this.prisma.actions.findUnique(query);
  }

  update(id: string, updateActionsDto: any) {
    return this.prisma.actions.update({
      where: { id },
      data: updateActionsDto,
      include,
    });
  }

  remove(id: string) {
    return this.prisma.actions.delete({
      where: { id },
      include,
    });
  }
}
