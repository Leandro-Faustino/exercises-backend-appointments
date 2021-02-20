/* eslint-disable camelcase */
//esta class valida se existe uma data ja existente no BD;
//se nao tiver cria um agndamento novo
//salva no banco de dados

import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/infra/http/error/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import { injectable,inject } from 'tsyringe';


interface IRequest {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  // eslint-disable-next-line camelcase
  constructor(
    @inject('AppointementsRepository')
    private appointmentsRepository: IAppointmentsRepository ) {


  }
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {


    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
