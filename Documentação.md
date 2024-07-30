# Iniciando a Aplicação

Para inicializar a aplicação, basta clonar o repositório e a IDE fará a importação das dependências, etc. Em seguida, acesse qualquer URL do localhost, por exemplo: `http://localhost:8080/home`. Você será redirecionado para a tela de login.
Obs: o arquivo.properties onde está a configuração para criar tabelas está como none, bem como as credencias e local do banco de dados estão utilizando variáveis de ambiente as quais terão de ser configuradas

Na tela de login, basta digitar o usuário (`unoesc`) e a senha (`unoesc@123`) e clicar em entrar. As credenciais estão salvas em memória na aplicação. Você será redirecionado para a tela inicial.

## Navegação

Na tela inicial, na parte superior, temos uma barra de navegação onde é possível:

- Navegar para as telas de cadastro e consulta
- Voltar para a tela inicial

### Cadastro

Para realizar um cadastro:

1. Preencha os campos e clique em **Salvar**.
2. As mensagens de erro nos campos são exibidas abaixo dos campos correspondentes.
3. Se o cadastro for bem-sucedido, a mensagem será exibida abaixo do botão **Salvar** e o ID do cadastro será preenchido.
4. Para realizar novos cadastros, use o botão **Limpar** para limpar o formulário.

### Consulta

As consultas são visualizadas em uma tabela, com paginação na parte inferior.

### Edição

Para editar registros:

1. Na tela de consulta, selecione o registro desejado e clique no botão **Editar**.
2. Você será redirecionado para a tela de cadastro onde o ID e os dados estarão preenchidos.
3. Alterar as informações e clicar em **Salvar** para confirmar as alterações.

### Exclusão

Para excluir registros:

1. Na tela de consulta, selecione um registro e clique em **Excluir**.
2. Será solicitada a confirmação da exclusão.
3. Caso haja algum dado associado ao registro, pode ser exibida uma mensagem de erro ao tentar excluir.

## Mural

O mural é acessado através da tela de consulta de times:

1. Selecione um time e clique no botão **Mural**.
2. Será exibida uma mensagem de carregamento até que tudo seja carregado e você será redirecionado para o mural.
3. O mural contém o nome da pessoa e o fato, e é carregado dinamicamente pelo Thymeleaf.
