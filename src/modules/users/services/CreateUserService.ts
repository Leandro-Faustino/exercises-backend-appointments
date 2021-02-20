import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/infra/http/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import { injectable,inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository) {

}

  public async execute({ name, email, password }: IRequest): Promise<User> {


    //verificar se o usuario existe
    const checkUserExists = await this.usersRepository.findByEmail(email);


    if (checkUserExists) {
      throw new AppError(' Email address already used.');
    }

    // se nao existir usuario faz criptografia password
    const hashedPassoword = await hash(password, 8);

    //criaçao do meu usuario pelo repositorioUser
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassoword,
    });

    return user;
  }
}
export default CreateUserService;
