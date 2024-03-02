import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitedJudgesService } from './invited-judges.service';
import { CreateInvitedJudgeDto } from './dto/create-invited-judge.dto';
import { UpdateInvitedJudgeDto } from './dto/update-invited-judge.dto';

@Controller('invited-judges')
export class InvitedJudgesController {
  constructor(private readonly invitedJudgesService: InvitedJudgesService) {}

  @Post()
  create(@Body() createInvitedJudgeDto: CreateInvitedJudgeDto) {
    return this.invitedJudgesService.create(createInvitedJudgeDto);
  }

  @Get()
  findAll() {
    return this.invitedJudgesService.findAll({});
  }

  @Get('competitions/:idCompetitions')
  findByCompetitions(@Param('idCompetitions') idCompetitions: string) {
    return this.invitedJudgesService.findByCompetitions(idCompetitions);
  }

  @Get(':idJudges/:idCompetitions')
  findOne(@Param('idJudges') idJudges: string, @Param('idCompetitions') idCompetitions: string) {
    return this.invitedJudgesService.findOne(idJudges, idCompetitions);
  }
  

  @Patch(':idJudges/:idCompetitions')
  update(@Param('idJudges') idJudges: string, @Param('idCompetitions') idCompetitions: string, @Body() updateInvitedJudgeDto: UpdateInvitedJudgeDto) {
    return this.invitedJudgesService.update(idJudges, idCompetitions, updateInvitedJudgeDto);
  }

  @Delete(':idJudges/:idCompetitions')
  remove(@Param('idJudges') idJudges: string, @Param('idCompetitions') idCompetitions: string) {
    return this.invitedJudgesService.remove(idJudges, idCompetitions);
  }
}
