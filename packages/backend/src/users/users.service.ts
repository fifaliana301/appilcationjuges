import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';

const saltUsers = 10;
const bcrypt = require('bcrypt');

const include: any = {
  admins: true,
  photos: true,
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: any) {
    const judge: any = await this.prisma.judges.findFirst({ where: { email: createUserDto.email, } });

    const user: any = await this.prisma.users.findFirst({ where: { email: createUserDto.email } });
    const competitor: any = await this.prisma.competitors.findFirst({ where: { email: createUserDto.email } });

    if (user) {
      throw new HttpException(`'Email alredy exist in user`, HttpStatus.UNAUTHORIZED);
    }

    if (judge) {
      throw new HttpException(`Email alredy exist in judge`, HttpStatus.UNAUTHORIZED);
    }

    if (competitor) {
      throw new HttpException(`'Email alredy exist in competitor`, HttpStatus.UNAUTHORIZED);
    }


    const newPassword = await bcrypt.hash(createUserDto.password, saltUsers);
    if (createUserDto.admins) {
      createUserDto.admins = { create: createUserDto.admins }
    }
    return this.prisma.users.create({
      data: {
        ...createUserDto,
        password: newPassword
      },
      include,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(id: string) {
    return this.prisma.users.findFirst({
      where: { id },
      include,
    });
  }

  update(id: string, updateUserDto: any) {

    if (updateUserDto.admins) {
      const idAdmin = updateUserDto.admins.id;
      delete(updateUserDto.admins.id);
      delete(updateUserDto.admins.usersId);
      updateUserDto.admins = {
        connect: { id: idAdmin },
        update: updateUserDto.admins,
      }
    }
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
      include,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: { id },
      include,
    });
  }
}
