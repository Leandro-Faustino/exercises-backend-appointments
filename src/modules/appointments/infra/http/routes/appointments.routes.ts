/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated); //pois todos minhas rotas vao usar este middleware

/* appointmentsRouter.get('/', async (request, response) => {

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

appointmentsRouter.post('/',appointmentsController.create )

export default appointmentsRouter;
