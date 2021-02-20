import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/infra/http/error/AppError';

interface TokenPayload {
  //retorno do meu token-
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  //validação do token jwt
  const authHeader = request.headers.authorization; //pegar o token de dentro da requisição

  if (!authHeader) {
    //validação se nao existir da um erro
    throw new AppError('JWT token is missing', 401);
  }
  //dividir token em partes [bearer + numero de token] quando eu não for usar uma variavel da desustruturação posso deixar em branco
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret); //vai verificar se meu token e valido,mesmo secret utilizado no service
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub, //sub do token
    };

    // eslint-disable-next-line no-console
    console.log(decoded);

    return next(); //se deu tudo certo faz com que a requisiçao continue middleware
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
