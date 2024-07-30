# Iniciando a aplicação
Para inicializar a aplicação basta clonar o repositório e a IDE fará os import de dependências etc..
Em seguida acesse qualquer url do localhost ex:http://localhost:8080/home, você será redirecionado para tela de login.
Na tela do login basta digitar usuario(unoesc) e senha(unoesc@123) e entrar, as credenciais estão salvas em memória na aplicação.
Você será redirecionado para tela de home
##Navegacao
Na tela de home, na parte superior temos uma barra de navegacão onde é possível navegar para as telas de cadastro e consulta ou ainda voltar para tela de home.
**Cadastro** 
Para realizar um cadastro basta preencher os campos e clicar em salvar, as mensagens de erro os campos são exibidas abaixo dos campos.
Se obtiver sucesso a mensagem será exibida abaixo do botão de salvar, e o id do cadastro será preenchido.
Para realizar novos cadastros deve-se limpar o formulário através do botão Limpar.
**Consulta**
As Consulta são visualizadas em uma tabela, onde na partes inferior temos a paginação da mesma
**Edição**
A edição dos registros é feita na tela de consulta selecionando o registro desejado e clicando no botão editar.
Você será redirecionado para tela de cadastro onde o ID e os dados estarão preenchidos.
Assim basta alterar as informações clicar em salvar e confirmar as alterações.
**Exlusão** 
A exclusão pode ser feita na tela de consulta, selecionando um registro e clicando em excluir, após isso será solicitada a confirmação.
Caso tenha algum dados dependendo do registro ele exibirá erro ao excluir

##Mural
O mural é acessado através da tela de consulta de times, selecionando um time e clicando no botão Mural, então será exibida uma mensagem de load até carregar tudo e redirecionado para o Mural.
O mural contem o nome da pessoa e o fato e é carregado dinamicamente pelo thymeleaf.
