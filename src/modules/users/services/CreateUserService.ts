import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/infra/http/error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    //verificar se o usuario existe
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError(' Email address already used.');
    }

    // se nao existir usuario faz criptografia password
    const hashedPassoword = await hash(password, 8);

    //criaçao do meu usuario pelo repositorioUser
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassoword,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
