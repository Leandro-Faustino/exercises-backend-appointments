import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/infra/http/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { injectable,inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,

  @inject('HashProvider')
  private hashProvider: IHashProvider,

  @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    //verificar se o usuario existe
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(' Email address already used.');
    }
    // se nao existir usuario faz criptografia password
    const hashedPassoword = await this.hashProvider.generateHash(password);

    //criaçao do meu usuario pelo repositorioUser
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassoword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}
export default CreateUserService;
