import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    throw new Error('JWT token is missing');
  }
  //dividir token em partes [bearer e numro de token]
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret); //vai verificar se meu token e valido
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    // eslint-disable-next-line no-console
    console.log(decoded);

    return next(); //se deu tudo certo faz com que a requisiçao continue middleware
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
