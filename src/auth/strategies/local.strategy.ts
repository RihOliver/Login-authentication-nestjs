import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'; //Essa lib ja traz a estratégia da autenticação,
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**O que vier desse validade vai permitir que o guardão avance */
  validate(email: string, password: string) {
    /**Aqui ele chama o service que vai fazer a lógica de checar o email e senha */
    return this.authService.validateUser(email, password);
  }
}
