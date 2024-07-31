const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
    extend schema
    @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key", "@requires", "@external"]
    )

    type UserOrder @key(fields: "id") {
        id: ID!
    }

    type User @key(fields: "id") {
        id: ID!
        firstName: String!
        lastName: String!
        address: String
        userOrders: [UserOrder!]
    }

    type Query {
        user: User
    }
`;

const lookupUser = () => ({
  id: 1,
  firstName: 'Jake',
  lastName: 'Dawkins',
  address: 'everywhere',
  userOrders: [
    {
      id: '1',
    },
  ],
});

const resolvers = {
  Query: {
    user: () => {
      return lookupUser();
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
