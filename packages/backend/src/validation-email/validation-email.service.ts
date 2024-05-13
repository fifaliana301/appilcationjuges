import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateValidationEmailDto } from './dto/create-validation-email.dto';
import { UpdateValidationEmailDto } from './dto/update-validation-email.dto';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CompetitorsService } from 'src/competitors/competitors.service';

@Injectable()
export class ValidationEmailService {

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => CompetitorsService)) private readonly competitorsService: CompetitorsService,
  ) { }

  create(createValidationEmailDto: any) {
    console.log(createValidationEmailDto)

    // generate number 6
    createValidationEmailDto.validate = (Math.random() * 1000000).toString().split(".")[0];

    // await this.emailService.validationEmail(
    //   {
    //     name: 'Nantenaina 2',
    //     email: "andrianantenaina321@gmail.com",
    //     otp: '****', // generate a random OTP
    //   })
    return this.prisma.validations.create({
      data: createValidationEmailDto
    });
  }

  findAll() {
    return `This action returns all validationEmail`;
  }

  findOne(where: any) {
    return this.prisma.validations.findFirst({
      where,
    });
  }

  update(id: number, updateValidationEmailDto: UpdateValidationEmailDto) {
    return `This action updates a #${id} validationEmail`;
  }

  remove(id: string) {
    return this.prisma.validations.delete({
      where: { id },
    });
  }

  async validationJudges(idUser: string, validate: string) {
    const validation: any = await this.findOne({ idUser });
    if (validate != validation?.validate) {
      throw new HttpException(`'validate error`, HttpStatus.UNAUTHORIZED);
    }
    let user: any;
    const type = validation?.type
    if (type == "competitors") {
      user = await this.competitorsService.findOne(validation.idUser)
    }
    if (!user) {
      throw new HttpException(`'validate error`, HttpStatus.UNAUTHORIZED);
    }
    await this.remove(validation.id);
    return {
      user: user,
      accessToken: this.jwtService.sign({
        userId: user.id,
        type: type
      }),
    };
  }
}
