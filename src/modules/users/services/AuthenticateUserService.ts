import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/infra/http/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import { injectable,inject } from 'tsyringe';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {

  }


  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // validAR SE O EMAIL DO USUARIO E VALIDO


    //se email recebido e igual ao email que esta dentro do banco de dados
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      //RETORNO PARA O USUARIO CASO DADOS INCORRETOS
      throw new AppError('incorrect email/password combination.', 401);
    }
    // user.passoword - senha criptografada
    // password - senha nao-criptografada
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('incorrect email/password combination.', 401);
    }
    // usuário autenticado,entao return user
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
      //token criado returne token
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
