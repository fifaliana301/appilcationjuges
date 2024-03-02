import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Judges, Prisma } from '@prisma/client';

const saltRounds = 10;
const bcrypt = require('bcrypt');

@Injectable() export class JudgesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createJudgeDto: any) {
    try {
      const judge: any = await this.prisma.judges.findFirst({
        where: {
          OR: [
            {
              login: createJudgeDto.login,
            },
            {
              email: createJudgeDto.email,
            }
          ]
        }
      });

      const user: any = await this.prisma.users.findFirst({ where: { email: createJudgeDto.email } });
      const competitor: any = await this.prisma.competitors.findFirst({ where: { email: createJudgeDto.email } });

      if (user) {
        throw new HttpException(`'Email alredy exist in user`, HttpStatus.UNAUTHORIZED);
      }

      if (judge) {
        throw new HttpException(`${judge.login == createJudgeDto.login ? 'Login' : 'Email'} alredy exist`, HttpStatus.UNAUTHORIZED);
      }

      if (competitor) {
        throw new HttpException(`'Email alredy exist in competitor`, HttpStatus.UNAUTHORIZED);
      }

      const newPassword = await bcrypt.hash(createJudgeDto.password, saltRounds);

      const newCreateJudgeDto = {
        data: {
          ...createJudgeDto,
          password: newPassword
        }
      }

      if (createJudgeDto.calendarsBattles) {
        const idCalendarsBattles = createJudgeDto.calendarsBattles.id
        delete (createJudgeDto.calendarsBattles)
        newCreateJudgeDto.data = {
          ...createJudgeDto,
          calendarsBattles: {
            connect: {
              id: idCalendarsBattles
            }
          }
        }
      }

      return this.prisma.judges.create(newCreateJudgeDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }


  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JudgesWhereUniqueInput;
    where?: Prisma.JudgesWhereInput;
    orderBy?: Prisma.JudgesOrderByWithRelationInput;
  }): Promise<Judges[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.judges.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string) {
    const user: any = await this.prisma.judges.findFirst({ where: { id } });
    return user;
  }

  update(id: string, updateJudgeDto: any) {
    return this.prisma.judges.update({
      where: { id },
      data: updateJudgeDto,
    });
  }

  remove(id: string) {
    return this.prisma.judges.delete({
      where: { id },
    });
  }

}
