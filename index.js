const { ApolloServer, gql } = require("apollo-server");

// Um esquema é uma coleção de definições de tipo (portanto, "typeDefs")
// que juntos definem a "forma" das consultas que são executadas em seus dados.

const typeDefs = gql`
  # Comentários em strings GraphQL (como este) começam com o símbolo hash (#).
  # Este tipo de "Book" define os campos consultáveis para cada livro em nossa fonte de dados.

  type Book {
    title: String
    author: String
  }

  # O tipo "Query" é especial: ele lista todas as consultas disponíveis que
  # os clientes podem executar, junto com o tipo de retorno de cada um. Nesse caso,
  # a consulta "books" retorna uma matriz de zero ou mais livros (definido acima).

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Medal of Honor",
    author: "Fernando Kendi",
  },
  {
    title: "Call of Duty",
    author: "João Wick",
  },
];

// Os resolvedores definem a técnica para buscar os tipos definidos no esquema.
// Este resolvedor recupera livros da matriz "livros" acima.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// O construtor ApolloServer requer dois parâmetros: seu esquema
// definição e seu conjunto de resolvedores.
const server = new ApolloServer({ typeDefs, resolvers });

// O método `listen` inicia um servidor web.
server.listen().then(({ url }) => {
  console.log(`🚀 o servidor está pronto em ${url}`);
});
