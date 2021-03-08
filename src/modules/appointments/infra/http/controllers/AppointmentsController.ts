import { Request, Response } from 'express';


import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

 export default class AppointmentController {
 public async create(request :Request, response: Response): Promise<Response> {
    const user_id = request.user.id   //pegar usuario logado
const { provider_id, date } = request.body;

  
  const createAppointment = container.resolve(CreateAppointmentService);//instancia serviçes passando repositorio

  const appointment = await createAppointment.execute({
    //passando paramentro para o services
    date,
    provider_id,
    user_id,
  });
  return response.json(appointment);


 }
}
