import { AuthJwtPayload } from '@auth/dto/auth.dto'
import { BoardsService } from '@boards/boards.service'
import { ProjectsService } from '@projects/projects.service'
import { TicketsService } from '@tickets/tickets.service'
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

interface CustomRequest extends Request {
  user: AuthJwtPayload
  params: {
    id: number
  }
}

@Injectable()
export class ModifyGuard {
  constructor(
    private reflector: Reflector,
    private projectService: ProjectsService,
    private boardService: BoardsService,
    private ticketService: TicketsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Ownership check
    const request = context.switchToHttp().getRequest<CustomRequest>()
    const user = request.user
    const params = request.params
    const controller = context.getClass().name

    let isOwner: boolean | null = false

    if (controller === 'ProjectsController') {
      const project = await this.projectService.findOne(+params.id, user.sub)
      isOwner = project && project.userId === user.sub
    }

    if (controller === 'BoardController') {
      const board = await this.boardService.findOne(+params.id, user.sub)
      isOwner = board && board.userId === user.sub
    }

    if (controller === 'TicketsController') {
      const ticket = await this.ticketService.findOne(+params.id, user.sub)
      isOwner = ticket && ticket.userId === user.sub
    }

    if (!isOwner) {
      throw new ForbiddenException('No authorization. You are not the owner.')
    }

    return true
  }
}
