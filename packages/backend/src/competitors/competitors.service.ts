import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Prisma, Competitors } from '@prisma/client';

import { CreateEmailDto } from 'src/email/dto/create-email.dto';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationEmailService } from 'src/validation-email/validation-email.service';

const saltRounds = 10;
const bcrypt = require('bcrypt');

const include: any = {
  calendarsBattles: true,
  actions: true,
  photos: true,
  videos: true,
  dancers: true,
  teams: true,
}

@Injectable()
export class CompetitorsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => ValidationEmailService))
    private validationEmailService: ValidationEmailService,
    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
  ) { }

  async create(createCompetitorDto: any) {
    const judge: any = await this.prisma.judges.findFirst({ where: { email: createCompetitorDto.email, } });

    const user: any = await this.prisma.users.findFirst({ where: { email: createCompetitorDto.email } });

    const competitor: any = await this.prisma.competitors.findFirst({
      where: {
        OR: [
          {
            name: createCompetitorDto.name,
          },
          {
            email: createCompetitorDto.email
          }
        ]
      }
    });
    if (user) {
      throw new HttpException(`'Email alredy exist in user`, HttpStatus.UNAUTHORIZED);
    }

    if (judge) {
      throw new HttpException(`Email alredy exist in judge`, HttpStatus.UNAUTHORIZED);
    }

    if (competitor) {
      throw new HttpException(`${competitor.name == createCompetitorDto.name ? 'Name' : 'Email'} alredy exist in competitor`, HttpStatus.UNAUTHORIZED);
    }

    const newPassword = await bcrypt.hash(createCompetitorDto.password, saltRounds);

    const newCreateCompetitorDto = {
      data: {
        ...createCompetitorDto,
        password: newPassword
      },
      include,
    }

    const keys = ["dancers", "teams"];
    keys.map((key: any) => {
      if (createCompetitorDto[key]) {
        newCreateCompetitorDto.data = {
          ...newCreateCompetitorDto.data,
          [key]: {
            create: createCompetitorDto[key]
          }
        }
      }
    });

    // { user, accessToken }
    const newCompetitor = await this.prisma.competitors.create(newCreateCompetitorDto);
    
    const validation = await this.validationEmailService.create({
      idUser: newCompetitor.id,
      emailUser: newCompetitor.email,
      type: 'competitors'
    });

    console.log("url:", `http://localhost:4000/validation/${newCompetitor.id}`)
    const emailData: CreateEmailDto = {
      to: newCompetitor.email,
      subject: 'Validation de compte',
      url: `http://localhost:3000/validation/${newCompetitor.id}`,
      validationCode: validation.validate
      
    };

    await this.emailService.sendMail(emailData);
    
    return {
      user: newCompetitor,
      // accessToken: this.jwtService.sign({
      //   userId: newCompetitor.id,
      //   type: 'competitors'
      // }),
    };
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompetitorsWhereUniqueInput;
    where?: Prisma.CompetitorsWhereInput;
    orderBy?: Prisma.CompetitorsOrderByWithRelationInput;
  }): Promise<Competitors[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.competitors.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findAllByCompetitions(id: string): Promise<Competitors[]> {
    return this.prisma.competitors.findMany({
      include: {
        ...include,
        competitions: {
          where: {
            id: id
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.competitors.findFirst({
      where: { id },
      include,
    });
  }

  async update(id: string, updateCompetitorDto: any) {
    const one = await this.findOne(id);
    if (!updateCompetitorDto.password) {
      updateCompetitorDto.password = one?.password;
    }

    const newUpdateCompetitorDto = {
      where: { id },
      data: updateCompetitorDto,
      include,
    }


    const keys = ["dancers", "teams"];
    keys.map((key: any) => {
      // if (updateCompetitorDto[key]) {
      //   const id = updateCompetitorDto[key].id
      //   // delete(updateCompetitorDto[key].id);
      //   newUpdateCompetitorDto.data = {
      //     ...newUpdateCompetitorDto.data,
      //     [key]: {
      //       connectOrCreate: {
      //         where: { id: id },
      //         create: {...updateCompetitorDto[key]}
      //       }
      //     }
      //   }
      //   delete (updateCompetitorDto[key])
      // }
      if (updateCompetitorDto[key]) {
        const id = updateCompetitorDto[key].id
        // delete(updateCompetitorDto[key].id);
        newUpdateCompetitorDto.data = {
          ...newUpdateCompetitorDto.data,
          [key]: {
            connect: { id: id },
            update: { ...updateCompetitorDto[key] }
          }
        }
        delete (updateCompetitorDto[key])
      }
    })
    console.log(newUpdateCompetitorDto.data.dancers)

    return this.prisma.competitors.update(newUpdateCompetitorDto);
  }

  remove(id: string) {
    return this.prisma.competitors.delete({
      where: { id },
      include,
    });
  }
}
