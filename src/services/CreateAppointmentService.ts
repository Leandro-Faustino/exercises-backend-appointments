/* eslint-disable camelcase */
//esta class valida se existe uma data ja existente no BD;
//se nao tiver cria um agndamento novo
//salva no banco de dados

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../error/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  // eslint-disable-next-line camelcase
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
