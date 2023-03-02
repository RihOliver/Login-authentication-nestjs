import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], //Importando tudo que estiver exportado de outro modulo para poder usar aqui nesse modulo
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
