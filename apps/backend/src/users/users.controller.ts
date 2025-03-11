import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get() // GET /users
  findAll() {
    return []
  }

  @Get(':id') // GET /users/1
  findOne(@Param('id') id: string) {
    return { id }
  }

  @Post() // POST /users
  create(@Body() user: object) {
    return user
  }

  @Patch(':id') // PATCH /users/1
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, ...userUpdate }
  }

  @Delete(':id') // DELETE /users/1
  delete(@Param('id') id: string) {
    return { id }
  }
}
