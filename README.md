Tecnologias Utilizadas

Backend (Servidor)
ASP.NET Core → Esse é o motor do meu backend, onde criei as APIs que conversam com o banco de dados e enviam as informações para o front.
Entity Framework Core → ORM que facilita a comunicação com o banco sem precisar escrever SQL manualmente. Basicamente, ele traduz as classes do C# em tabelas no banco.
SQLite → Banco de dados relacional bem leve, ideal pra testes e pequenas aplicações, já que não precisa de um servidor dedicado pra rodar.

Frontend (Interface)
Angular → Framework frontend para construir a interface da aplicação de forma dinâmica e modular.
Angular Material → Biblioteca de componentes com o design do Google (Material Design), que ajuda a dar um visual mais profissional e consistente para a aplicação.
TypeScript → Linguagem que adiciona tipagem ao JavaScript, tornando o código mais seguro e organizado.

Estrutura do Projeto

Backend (PessoaAPI)
Controllers → Aqui estão as regras de entrada das requisições. O PessoaController recebe as chamadas da interface (ex: listar, adicionar, editar e excluir pessoas) e chama o serviço correspondente.
Data → Contém o PessoaContext, que é responsável pela comunicação com o banco via Entity Framework.
Migrations → Aqui ficam os arquivos que definem como o banco de dados deve ser estruturado e atualizado ao longo do tempo.
Models → Define a estrutura da entidade Pessoa, ou seja, como os dados das pessoas são armazenados no sistema.

🖥️ Frontend (PessoaFrontend)
app/ → Estrutura do Angular. Dentro dele temos:
components/ → Contém os componentes da aplicação, como pessoa-list (lista de pessoas) e pessoa-form (formulário de cadastro/edição).
services/ → Onde está o pessoa.service.ts, que faz as chamadas HTTP para o backend.
assets/ → Arquivos estáticos, como imagens e estilos.

O que já está funcionando?

✅ Listagem de Pessoas → Exibe as pessoas cadastradas em uma tabela, mostrando nome, idade, estado civil, CPF, cidade e estado.

✅ Cadastro de Pessoas → Formulário onde você pode adicionar uma nova pessoa com todos os dados necessários.

✅ Edição de Pessoas → Permite atualizar os dados de uma pessoa cadastrada. Já tem algumas validações, como estado civil só aceitar valores pré-definidos.

✅ Exclusão de Pessoas → Dá pra remover um registro do sistema.

✅ Validações →

Estado civil só pode ser um dos permitidos (Solteiro, Casado, Viúvo, Divorciado, Separado).
Estado só pode ser uma sigla válida (RJ, SP, MG, etc.).

O que estou melhorando?

Notificação de sucesso ou erro ao adicionar um usuário.

Validação no Backend
