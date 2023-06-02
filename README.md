# Kanban

Uma aplicação PWA para gerenciar tarefas, que permite adicionar, editar, excluir e pesquisar tarefas, além de visualizar as tarefas no modo kanban, o qual é possível mudar o status da tarefa. 

https://github.com/hiraclau/kanban/assets/579060/ef5a8d39-de96-472f-abf2-d7d4aca93ea4

## Funcionalidades

- Adicionar uma nova tarefa, especificando um título e uma descrição
- Editar e excluir uma tarefa existente.
- Barra de pesquisa que permite que o usuário pesquise tarefas com base em uma palavra-chave
- Página inicial que exibe uma tabela paginada com as tarefas adicionadas pelo usuário
- Modo kanban para visualizar as tarefas e seu andamento.

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org) instalado em seu ambiente de desenvolvimento local.
2. Faça o clone deste repositório para o diretório desejado em sua máquina.
3. Navegue até o diretório raiz do projeto no terminal.
4. Execute o seguinte comando para instalar as dependências:

```bash
yarn install
```

## Uso

1. No diretório raiz do projeto, execute o seguinte comando para iniciar a aplicação:

```bash
yarn start
```

2. Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Testes

A aplicação possui testes para garantir o bom funcionamento das funcionalidades. Os testes utilizam Jest e Testing Library para verificar os seguintes cenários:

- Exibir a página inicial corretamente.
- Exibir o modal corretamente.
- Criar uma nova tarefa.
- Pesquisar uma tarefa existente.
- Navegar para a próxima página da lista de tarefas.
- Navegar para a página anterior da lista de tarefas.
- Navegar para a primeira página da lista de tarefas.
- Navegar para a última página da lista de tarefas.
- Excluir uma tarefa.
- Editar uma tarefa.

No diretório raiz do projeto, execute o seguinte comando para iniciar a aplicação:

```bash
yarn test
```

## Estrutura do Projeto

A estrutura de arquivos e diretórios do projeto é organizada da seguinte forma:

```
kanban/

  node_modules/
  public/
    favicon.ico
    index.html
    logo144.png
    logo192.png
    logo512.png
    manifest.json
    style.css
  src/
    components/
      Column.js
      Header.js
      Modal.js
    contexts/
      TaskContext.js
    mock/
      tasks.json
    hooks/
      useColumn.js
      useError.js
      useModal.js
      usePagination.js
    pages/
      Home.js
      Kanban.js
    tests/
      App.js
    App.js
    index.js
    serviceWorker.js
    serviceWorkerRegistration.js
  .gitignore
  babel.config.js
  jest.config.js
  package.json
  README.md
  yarn.lock
```

- O diretório `public/` contém o arquivo HTML principal da aplicação.
- O diretório `src/` contém os arquivos JavaScript da aplicação.
- O diretório `src/components/` contém os componentes reutilizáveis da aplicação.
- O diretório `src/contexts/` contém os arquivos relacionados ao Context API.
- O diretório `src/mock/` contém o arquivo JSON com os dados iniciais para validar a paginação.
- O diretório `src/hooks/` contém os hooks personalizados utilizados na aplicação.
- O diretório `src/pages/` contém os componentes das páginas da aplicação.
- O diretório `src/tests/` contém os testes feito para as funcionalidades da aplicação.
