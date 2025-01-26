import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) { }

  @Post()
  create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return this.competitionsService.create(createCompetitionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: any) {
    console.log("req.user", req.user)
    if (req.user?.type == "judges") {
      return this.competitionsService.findAll({
        where: {
          invitedJudges: {
            some: {
              judgesId: req?.user?.id,
              accept: true
            }
          }
        }
      });
    }
    return this.competitionsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @Patch('/addCompetitorsToCompetitions')
  addCompetitorsToCalendarsBattles(@Body() ids: { idCompetitors: string, idCompetition: string }) {
    console.log("@Patch('/addCompetitorsToCompetitions')")
    return this.competitionsService.subscriptionCompetitors(ids);
  }

  @Patch('/deleteCompetitorsToCompetions')
  deleteJudgesToCalendarsBattles(@Body() ids: { idCompetitors: string, idCompetion: string }) {
    return this.competitionsService.unsubscriptionCompetitors(ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionsService.update(id, updateCompetitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionsService.remove(id);
  }


}
