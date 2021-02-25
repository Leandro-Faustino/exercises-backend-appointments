
import AppError from '@shared/infra/http/error/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
//let fakeCacheProvider: FakeCacheProvider;
//let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    //fakeNotificationsRepository = new FakeNotificationsRepository();
    //fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
     // fakeNotificationsRepository,
      //fakeCacheProvider,

    )
    });
it('should be able to create a new appointment', async () => {

  //criamos um appointment
const appointment = await createAppointment.execute({
 date: new Date(),
 provider_id: '2353465654',
});

expect(appointment).toHaveProperty('id');
expect(appointment.provider_id).toBe('2353465654');
});

 it('should not be able to create two appointment on the same time', async () => {

  const appointmentDate = new Date(2020, 4, 10, 11);
  await createAppointment.execute({
    date: new Date(),
    provider_id: '2353465654',
   });

expect( createAppointment.execute({
  date: new Date(),
  provider_id: '2353465654',
 })).rejects.toBeInstanceOf(AppError)

});
})
