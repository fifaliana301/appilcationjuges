import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CalendarsBattlesService } from './calendars-battles.service';
import { CreateCalendarsBattleDto } from './dto/create-calendars-battle.dto';
import { UpdateCalendarsBattleDto } from './dto/update-calendars-battle.dto';

@Controller('calendars-battles')
export class CalendarsBattlesController {
  constructor(private readonly calendarsBattlesService: CalendarsBattlesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createCalendarsBattleDto: CreateCalendarsBattleDto) {
    return this.calendarsBattlesService.create(createCalendarsBattleDto);
  }

  @Post('/addJudgesToCalendarsBattles')
  addJudgesToCalendarsBattles(@Body() ids: {idJudges: string, idCalendarsBattles: string}) {
    return this.calendarsBattlesService.addJudgesToCalendarsBattles(ids);
  }

  @Post('/deleteJudgesToCalendarsBattles')
  deleteJudgesToCalendarsBattles(@Body() ids: {idJudges: string, idCalendarsBattles: string}) {
    return this.calendarsBattlesService.deleteJudgesToCalendarsBattles(ids);
  }

  @Post('/addCompetitorsToCalendarsBattles')
  addCompetitorsToCalendarsBattles(@Body() ids: {idCompetitors: string, idCalendarsBattles: string}) {
    return this.calendarsBattlesService.addCompetitorsToCalendarsBattles(ids);
  }

  @Post('/deleteCompetitorsToCalendarsBattles')
  deleteCompetitorsToCalendarsBattles(@Body() ids: {idCompetitors: string, idCalendarsBattles: string}) {
    return this.calendarsBattlesService.deleteCompetitorsToCalendarsBattles(ids);
  }

  @Get()
  findAll() {
    return this.calendarsBattlesService.findAll({});
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.calendarsBattlesService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCalendarsBattleDto: UpdateCalendarsBattleDto) {
    return this.calendarsBattlesService.update(id, updateCalendarsBattleDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.calendarsBattlesService.remove(id);
  }
}
