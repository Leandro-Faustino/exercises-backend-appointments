import {  getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { getMonth, getYear, getDay } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>; //cria typo repositorio

  constructor() {
    this.ormRepository = getRepository(Appointment); //cria o repositorio
  }

  public async findByDate(date:Date,provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });
    return findAppointment;
  }


  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    //se a minha string nao tiver 2 digitos eu quero que preencha od digitos faltantes a esquerda com 0
    const  parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
where: {
  provider_id,
  date: Raw(dateFieldName =>
    `to_char(${dateFieldName}, 'MM-YYYY'= '${parsedMonth}-${year}')` ,      //vai converter o campo que nao é uma string em uma string
    ) //vai estar armazenado o nome que este campo vai ter na minha sql
}

    })
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const  parsedDay = String(day).padStart(2, '0');
    const  parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
where: {
  provider_id,
  date: Raw(dateFieldName =>
    `to_char(${dateFieldName}, 'DD-MM-YYYY'= '${parsedDay}- ${parsedMonth}-${year}'` ,      //vai converter o campo que nao é uma string em uma string
    ), //vai estar armazenado o nome que este campo vai ter na minha sql
},

 relations:['user'],

    });
    return appointments;
  }


  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date ,user_id});
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
