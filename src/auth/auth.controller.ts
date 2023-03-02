import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
  /**Declarando o meu service que vai trabalhar para esse controller */
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK) //Passando um status 200
  @UseGuards(LocalAuthGuard) //Aqui estou declarando que meu post na rota login vai usar esse guardião que é o primeiro codigo a ser passado
  /**Só posso entrar no mecanismo de login caso passe pelo guardião */
  login(@Request() req: AuthRequest) {
    console.log(req.user);
    /**Aqui retorno a chamada ao login() que está dentro de authService*/
    return this.authService.login(req.user);
  }
}
