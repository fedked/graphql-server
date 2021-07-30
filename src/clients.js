// Outro exemplo básico - intermediário

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Client {
    _id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    users: [Client!]!
    getUserByEmail(email: String!): Client!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Fulano",
    email: "fulano@teste.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Fulano2",
    email: "fulano2@teste.com",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "Fulano3",
    email: "fulano3@teste.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "hello world",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((client) => client.email == args.email);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 o servidor está pronto em ${url}`);
});
