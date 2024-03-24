### Regras da aplicação

[x] Deve ser possível criar um usuário
[x] Deve ser possível identificar o usuário entre as requisições
[x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    
    *As refeições devem ser relacionadas a um usuário.*
    
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta

[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
[x] Deve ser possível apagar uma refeição
[x] Deve ser possível listar todas as refeições de um usuário
[x] Deve ser possível visualizar uma única refeição
[x] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
    - [x] Melhor sequência de refeições dentro da dieta
    
[x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos não funcionais
A aplicação utiliza o framework back-end Fastify, reconhecido por sua eficiência e suporte tanto para JavaScript quanto para TypeScript. O Fastify é um micro framework com uma abordagem minimalista em relação à arquitetura, concedendo aos desenvolvedores a liberdade de definir a arquitetura mais adequada para o projeto. Além disso, ele oferece integração total com TypeScript, facilitando o desenvolvimento de aplicações robustas e escaláveis.

O gerenciamento de ambiente é realizado de forma eficiente utilizando o DotEnv. Essa ferramenta permite configurar e acessar variáveis de ambiente, simplificando a configuração em diferentes ambientes, como desenvolvimento, teste e produção. Em conjunto com o Zod, uma biblioteca de validação de tipos, garantimos que as variáveis de ambiente sejam consistentes e adequadas para o funcionamento da aplicação, proporcionando maior segurança e confiabilidade.

Para identificação de usuários dentro da aplicação, adotamos a estratégia de cookies em conjunto com o plugin FastifyCookies. Embora ainda não haja um sistema completo de login neste estágio inicial do MVP, essa abordagem permite realizar operações como listagem, remoção e alteração de refeições com base no cookie associado ao usuário. Essa escolha oferece uma solução simples e eficaz para gerenciar interações individuais na aplicação.

### Contexto da aplicação

 - Essa aplicação servirá para o usuario controlar suas refeições dentro de um objetivo final, seja musculação, hipertofria, ganho de peso, e etc.