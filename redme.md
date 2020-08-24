 Aplicação: Cadastro de Agendamentos.

 Informações da aplicação:
🧨MODELS : este arquivo define qual o formato do dados de uma entidade(appointments);

🎈REPOSITORIES : É um arquivo que faz conexão entre a persistência dos dados e as rotas;
vamos armazenar meus agendamentos,sendo em uma variável ou banco de dados, e meus métodos(create(),find() ...) responsáveis por manipular os dados da minha aplicação.

🎃ROTES : Responsável pelas minhas rotas da aplicação.Sua função é:
• Receber Requisição;
• chamar outro arquivo;
• Devolver resposta

👀OBSERVAÇÃO : Tambem vamos ter um arquivo de PERSISTÊNCIA,mais como ainda não aprendemos banco de dados,criaremos nossos arquivos dentro de repoisitories em uma variável.

    ✔padroês de arquitetura :

    Persistencia     <->     repositories    <->       rotes

