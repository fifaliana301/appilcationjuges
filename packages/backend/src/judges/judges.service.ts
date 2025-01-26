import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Judges, Prisma } from '@prisma/client';
import { ValidationEmailService } from 'src/validation-email/validation-email.service';
import { CreateEmailDto } from 'src/email/dto/create-email.dto';
import { EmailService } from 'src/email/email.service';

const saltRounds = 10;
const bcrypt = require('bcrypt');

@Injectable() export class JudgesService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ValidationEmailService))
    private validationEmailService: ValidationEmailService,
    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
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


      const newJudge = await this.prisma.judges.create(newCreateJudgeDto);
      const validation = await this.validationEmailService.create({
        idUser: newJudge.id,
        emailUser: newJudge.email,
        type: 'judges'
      });

      console.log("url:", `http://localhost:3000/validation/${newJudge.id}`)
      const emailData: CreateEmailDto = {
        to: newJudge.email,
        subject: 'Validation de compte',
        url: `http://localhost:3000/validation/${newJudge.id}`,
        validationCode: validation.validate
      };

      await this.emailService.sendMail(emailData);

      return {
        user: newJudge
      }

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
