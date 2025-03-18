import { Module } from '@nestjs/common'
import { ProjectsService } from '@projects/projects.service'
import { ProjectsController } from '@projects/projects.controller'
import { DatabaseModule } from '@database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
