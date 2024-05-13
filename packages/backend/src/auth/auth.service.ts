import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompetitorsService } from 'src/competitors/competitors.service';
import { JudgesService } from 'src/judges/judges.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

const saltRounds = 10;
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private judgesService: JudgesService,
    private usersService: UsersService,
    private competitorsService: CompetitorsService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async validateUser(payload: any) {
    // const user = await this.judgesService.findOne(payload.id);
    let user: any;
    let type = "users";
    user = await this.usersService.findOne(payload.userId);
    if (user?.admins) {
      type = user?.admins?.role?.toLowerCase();
    }

    if (!user) {
      user = await this.judgesService.findOne(payload.userId);
      type = "judges";
    }

    if (!user) {
      user = await this.competitorsService.findOne(payload.userId);
      type = "competitors";
    }


    if (!user) {
      return null;
    }

    user.type = type;
    return user;
  }


  async login(userDto: any) {
    let user: any;
    let type = "users";
    user = await this.prisma.users.findFirst({ where: { email: userDto.email }, include: { admins: true } });
    console.log(user)
    if (user?.admins) {
      type = user?.admins?.role?.toLowerCase();
    }

    if (!user) {
      user = await this.prisma.judges.findFirst({ where: { email: userDto.email } });
      type = "judges";
    }

    if (!user) {
      user = await this.prisma.competitors.findFirst({ where: { email: userDto.email } });
      type = "competitors";
    }

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const resultUser = await bcrypt.compare(userDto.password, user.password)
    if (!resultUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      user: user,
      accessToken: this.jwtService.sign({
        userId: user.id,
        type: type,
      }),
    };
  }

  shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  sortByCreatedAt(array: any) {
    return array.sort((a: any, b: any) => b.createdAt - a.createdAt);
  }

  async getAllComptes() {
    const users = await this.usersService.findAll({});
    const judges = await this.judgesService.findAll({});
    const competitors = await this.competitorsService.findAll({});

    return this.sortByCreatedAt([...users, ...judges, ...competitors]);
  }

  async toggleStatus(userDto: any) {
    userDto.status = userDto.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    delete(userDto.photos)
    let response: any;
    switch (userDto.table_name) {
      case "Users":
        response = this.usersService.update(userDto.id, userDto)
        break;
      case "Judges":
        response = this.judgesService.update(userDto.id, userDto)
        break;
      case "Competitors":
        response = this.competitorsService.update(userDto.id, userDto)
        break;
      default:

    }

    return response;
  }
}
