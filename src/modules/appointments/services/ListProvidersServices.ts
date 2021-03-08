

import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

     @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

   public async execute({ user_id }: IRequest): Promise<User[]> {

     //tentar encontrar nossos usuarios no cache
     let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

//se nao for encontrado usuario do cache vou carregar e salvar no cacke
if (!users){
       users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
});
}
//armazenar a listagem dos prestadores sem trzaer usuario logado
       await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );


    return users;
  }
}

export default ListProvidersService;
