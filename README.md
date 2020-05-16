GAME LOGS CHALLENGE

A solução foi implementada em Node.js, utilizando as bibliotecas:
    - express
    - cors
    - readline

No diretório escolhido, execute no terminal o comando abaixo para iniciar o projeto, e em seguida adicione as bibliotecas citadas acima:

    $ npm init -y
    $ npm install express cors readline

Para executar o projeto, no terminal, digite;
    
    $ node index.js

Após a execução, o parser implementado irá varrer o arquivo de log games.log, incluído no diretório 'logs', agrupar os resultados de cada game e salvar em um arquivo nomeado collection.js localizado no diretório 'collections'. Este arquivo collection.js será utilizado como base de dados para a API, que já estará rodando aceitando requisições a partir da porta 3000.

A API, tem duas rotas possíveis:

    - http://localhost:3000/game/result -> retorna todos os resultados de games contidos no log
    {
        "0": {
            "total_kills": 0,
            "players": [],
            "kills": {}
        },
        "1": {
            "total_kills": 0,
            "players": [],
            "kills": {}
        },
        ...
    }


    - http://localhost:3000/game/result/:id -> retorna o resultado de um game especifico
    {
        "total_kills": 0,
        "players": [],
        "kills": {
            "Nome Usuário": Número de mortes,
        }
    }
