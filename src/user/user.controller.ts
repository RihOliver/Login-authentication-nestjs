import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user') // define a rota base para as rotas deste controller
export class UserController {
  constructor(private readonly userService: UserService) { } //injeta o service de usuário no construtor

  @Post() // define a rota POST para a criação de usuário
  create(@Body() createUserDto: CreateUserDto) {
    // acima define o método create para receber os dados do usuário através do DTO
    return this.userService.create(createUserDto); // chama o método create do service de usuário, passando os dados do DTO
  }
}
