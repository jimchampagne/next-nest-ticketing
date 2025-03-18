import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseService } from '@database/database.service'

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.databaseService.project.create({ data: createProjectDto })
  }

  async findAll() {
    return this.databaseService.project.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.project.findUnique({ where: { id } })
  }

  async update(id: number, updateProjectDto: Prisma.ProjectUpdateInput) {
    return this.databaseService.project.update({
      where: { id },
      data: updateProjectDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.project.delete({ where: { id } })
  }
}
