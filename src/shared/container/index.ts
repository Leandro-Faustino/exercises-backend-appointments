import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',   //id ou nome do repository que vai ser usado
  AppointmentsRepository       //retorno
  );

  container.registerSingleton<IUsersRepository>(
    'UsersRepository',   //id ou nome do repository que vai ser usado
    UsersRepository       //retorno
    );
