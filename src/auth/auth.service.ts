import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {} //Sempre que precisar de um service tem que trazer ele aqui via dependencia

  login(user: User): UserToken {
    //Esse método recebe usuario que foi buscado do banco e transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email); //Com isso busco usuario pelo email e trago para variavel

    if (user) {
      //Checar se a senha informada corresponde a hash que está no banco
      //Esse método compara a senha que você digitou com a encriptada do banco
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          //Sempre tenho que devolver os dados que foram passados mas a senha sempre undefined.
          ...user,
          password: undefined,
        };
      }
    }

    //Se chegar aqui, significa que não encontrou um user e/ou a senha não corresponde
    throw new Error('Email address or password provided is incorrect.');
  }
}
