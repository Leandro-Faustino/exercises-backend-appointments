/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/infra/http/error/AppError';
import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable,inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {

  }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {


    const user = await this.usersRepository.findById(user_id); //procurar por um usuario id
    if (!user) {
      throw new AppError('only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); //path.join une dois caminhos 1-caminho do meu upload, 2-arquivos que queremos remover
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); //uso do file system do node com uma funçao que retorna status do arquivo caso exista;

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); //deleta arquivo pelo nome
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user); //serve para atualizar um usuario existente ou criar um novo usuario
    return user; //return usuario atual
  }
}

export default UpdateUserAvatarService;
