import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // importa o módulo PrismaModule
  controllers: [UserController], // declara o UserController como um controlador para ser gerenciado pelo NestJS
  providers: [UserService], // declara o UserService como um provedor de serviço para ser gerenciado pelo NestJS
})
export class UserModule {} // declara a classe UserModule que representa o módulo do NestJS
