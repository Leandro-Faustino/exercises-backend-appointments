

import { container } from 'tsyringe';
import  '@modules/users/providers/HashProvider/index';
import '@modules/users/providers/HashProvider/index';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',   //id ou nome do repository que vai ser usado
  AppointmentsRepository       //retorno
  );

  container.registerSingleton<IUsersRepository>(
    'UsersRepository',   //id ou nome do repository que vai ser usado
    UsersRepository       //retorno
    );

    container.registerSingleton<IUserTokensRepository>(
      'UsersTokensRepository',   //id ou nome do repository que vai ser usado
      UserTokensRepository       //retorno
      );
