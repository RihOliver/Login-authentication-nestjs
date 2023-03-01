import { Injectable } from '@nestjs/common'; // importa o decorator Injectable do NestJS
import { CreateUserDto } from './dto/create-user.dto'; // importa o DTO de criação de usuário
import { PrismaService } from 'src/prisma/prisma.service'; // importa o serviço PrismaService
import * as bcrypt from 'bcrypt'; // importa a biblioteca bcrypt para encriptar senhas

@Injectable() // define a classe como um serviço injetável
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // construtor que recebe uma instância do serviço PrismaService

  async create(createUserDto: CreateUserDto) {
    const data = {
      // cria um objeto data com os dados do DTO e a senha encriptada
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data }); // cria um novo usuário no banco de dados usando o serviço PrismaService

    return {
      // retorna o usuário criado sem a senha encriptada
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    // método que busca um usuário pelo email para fazer login
    this.prisma.user.findUnique({
      where: { email },
    });
  }
}
