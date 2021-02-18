/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/infra/http/error/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id); //procurar por um usuario id
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

    await usersRepository.save(user); //serve para atualizar um usuario existente ou criar um novo usuario
    return user; //return usuario atual
  }
}

export default UpdateUserAvatarService;
