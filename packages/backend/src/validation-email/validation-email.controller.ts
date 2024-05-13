import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidationEmailService } from './validation-email.service';
import { CreateValidationEmailDto } from './dto/create-validation-email.dto';
import { UpdateValidationEmailDto } from './dto/update-validation-email.dto';

@Controller('validation-email')
export class ValidationEmailController {
  constructor(private readonly validationEmailService: ValidationEmailService) {}

  @Post()
  create(@Body() createValidationEmailDto: CreateValidationEmailDto) {
    return this.validationEmailService.create(createValidationEmailDto);
  }

  @Get()
  findAll() {
    return this.validationEmailService.findAll();
  }


  @Post('validation/:idUser/:validate')
  validationJudges(@Param('idUser') idUser: string, @Param('validate') validate: string) {
    return this.validationEmailService.validationJudges(idUser, validate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.validationEmailService.findOne({id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValidationEmailDto: UpdateValidationEmailDto) {
    return this.validationEmailService.update(+id, updateValidationEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validationEmailService.remove(id);
  }
}
