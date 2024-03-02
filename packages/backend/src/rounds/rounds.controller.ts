import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rounds')
@ApiTags('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) { }

  @Post()
  create(@Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.create(createRoundDto);
  }

  @Post("update_all/:id")
  update_all(@Param('id') id: string, @Body() createRoundDto: CreateRoundDto) {
    return this.roundsService.update_all(id, createRoundDto);
  }

  @Post("active/:id")
  active(@Param('id') id: string) {
    return this.roundsService.active(id);
  }

  @Get()
  findAll() {
    const req = {
      orderBy: {
        order: 'desc'
      },
    } as any;
    return this.roundsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundsService.findOne(id);
  }

  @Get('calendars_battles/:id')
  findOneCalendarsBattles(@Param('id') id: string) {
    const req = {
      where: { calendarsBattlesId: id },
      orderBy: {
        order: 'asc'
      },
    } as any;
    return this.roundsService.findAll(req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundsService.update(id, updateRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundsService.remove(id);
  }
}
