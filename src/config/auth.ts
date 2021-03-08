export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',//TODAS NOSSAS VRAIVEIS DE AMBIENTE VAO FICAR AQUI DENTRO
    expiresIn: '1d',
  },
};
