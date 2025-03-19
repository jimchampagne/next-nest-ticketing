import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { ProjectsService } from '@projects/projects.service'
import { Prisma } from '@prisma/client'
import { AccessTokenGuard } from '@/guards/accessToken.guard'
import { ModifyGuard } from '@/guards/modify.guard'
import { AuthenticatedRequest } from '@/auth/dto/auth.dto'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() requestBody: CreateProjectDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.projectsService.create({
      title: requestBody.title,
      description: requestBody.description,
      user: {
        connect: {
          id: request.user.sub,
        },
      },
    })
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.projectsService.findAll(request.user.sub)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.projectsService.findOne(+id, request.user.sub)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: Prisma.ProjectUpdateInput,
  ) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @UseGuards(AccessTokenGuard, ModifyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id)
  }
}
