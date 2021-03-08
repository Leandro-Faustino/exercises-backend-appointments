interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',  //driver na minha variavel de ambiente

  defaults: {
    from: {
      //email configurado no adress
      email: 'leandrofaustino@gmail.com',
      name: 'Leandro faustino ',
    },
  },
} as IMailConfig;
