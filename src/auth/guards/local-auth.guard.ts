import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    /**Aqui vai o método que retorna se aquele guard pode ativar e permitir o acesso aquela rota ou não*/
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw new UnauthorizedException(err?.message);
        }

        return user;
    }
}