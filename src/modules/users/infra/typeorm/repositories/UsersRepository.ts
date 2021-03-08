import {  getRepository, Repository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import usersRouter from '../../http/routes/users.routes';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';


class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>; //cria typo repositorio

  constructor() {
    this.ormRepository = getRepository(User); //cria o repositorio
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user;

    };
public async findByEmail(email: string): Promise<User | undefined> {
  const user = await this.ormRepository.findOne({
    where: {email,}
  });
  return user;
}
public async findAllProviders( {except_user_id} :IFindAllProvidersDTO): Promise<User[]> {
let users: User[];

  if ( except_user_id) {
   users = await this.ormRepository.find({
    where: {
      id: Not(except_user_id),
    }
  })
} else {
   users = await this.ormRepository.find();
}

return users;
}

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);
    await this.ormRepository.save(appointment);

    return appointment;
  }

    public async save(user: User): Promise<User> {
      return this.ormRepository.save(user);

  }
}

export default UsersRepository;
