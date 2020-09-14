//quero sobsescrever uma tipagem dentro do express;
declare namespace Express {
  export interface Request {
    //vai adicionar um informação nova dentro do meu request que é o user
    user: {
      id: string;
    };
  }
}
