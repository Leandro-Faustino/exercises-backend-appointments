import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../error/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    // validAR SE O EMAIL DO USUARIO E VALIDO
    const userRepository = getRepository(User);

    //se email recebido e igual ao email que esta dentro do banco de dados
    const user = await userRepository.findOne({ where: { email } });

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
