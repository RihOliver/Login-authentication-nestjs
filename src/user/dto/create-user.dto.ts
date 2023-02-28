import { User } from '../entities/user.entity'; // importa a entidade User
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'; // importa os decoradores do class-validator

export class CreateUserDto extends User { // define a classe CreateUserDto que herda da entidade User
    @IsEmail() // decora o atributo email com o validador IsEmail do class-validator
    email: string;

    @IsString() // decora o atributo password com o validador IsString do class-validator
    @MinLength(4) // adiciona a validação de comprimento mínimo de 4 caracteres
    @MaxLength(20) // adiciona a validação de comprimento máximo de 20 caracteres
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { // adiciona a validação de expressão regular
        message: 'password too weak',
    })
    password: string;

    @IsString() // decora o atributo name com o validador IsString do class-validator
    name: string;
}

/**
 * Em resumo, a classe CreateUserDto é um objeto de transferência de dados (DTO) que define a estrutura dos dados que serão recebidos para criar um novo usuário no sistema. 
 * Ela herda da entidade User e adiciona validações usando os decoradores do class-validator.
Esses decoradores ajudam a garantir que os dados fornecidos para criar um novo usuário no sistema estejam em conformidade com as regras de negócio definidas pela aplicação. 
Dessa forma, eles ajudam a prevenir erros e aumentar a segurança do sistema.
 */