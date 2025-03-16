import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users = [
    //id name email role
    { id: 1, name: 'Alice', email: 'alice@test.com', role: 'ADMIN' },
    { id: 1, name: 'Jim', email: 'jim@test.com', role: 'ADMIN' },
    { id: 1, name: 'Enid', email: 'enid@test.com', role: 'ADMIN' },
    { id: 1, name: 'Walter', email: 'Walter@test.com', role: 'ADMIN' },
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role)
      if (!rolesArray.length) {
        throw new NotFoundException(`Users with role ${role} not found`)
      }
      return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  create(user: CreateUserDto) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id)
    const highestId = usersByHighestId[0].id
    const newUser = { id: highestId + 1, ...user }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return removedUser
  }
}
