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
    return 'This action returns all users'
  }

  @Get(':id') // GET /users/42
  findOne() {
    return 'This action returns a user'
  }

  @Post() // POST /users
  create(@Body() user: object) {
    return user
  }

  @Patch(':id') // PATCH /users/42
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, ...userUpdate }
  }

  @Delete(':id') // DELETE /users/42
  delete(@Param('id') id: string) {
    return { id }
  }
}
