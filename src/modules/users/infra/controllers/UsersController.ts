import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';


export default class UsersController {
  public async create(request : Request, response: Response):Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);// instancio repository quando chamo serviço
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    //apaga a senha do usuario
    delete user.password;

    return response.json(user);
  };
  };
