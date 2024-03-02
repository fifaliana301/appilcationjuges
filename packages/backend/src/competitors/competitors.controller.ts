import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';

@Controller('competitors')
export class CompetitorsController {
  constructor(private readonly competitorsService: CompetitorsService) { }

  @Post()
  create(@Body() createCompetitorDto: CreateCompetitorDto) {
    return this.competitorsService.create(createCompetitorDto);
  }

  @Get()
  findAll() {
    return this.competitorsService.findAll({});
  }

  @Get('competitions/:id')
  findAllByCompetitions(@Param('id') id: string) {
    return this.competitorsService.findAllByCompetitions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetitorDto: UpdateCompetitorDto) {
    return this.competitorsService.update(id, updateCompetitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitorsService.remove(id);
  }
}
