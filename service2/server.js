const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.5"
      import: ["@key", "@requires", "@external"]
    )

  type UserOrder @key(fields: "id", resolvable: false) {
    id: ID!
  }

  type User @key(fields: "id") {
    id: ID!
    userOrders: [UserOrder!] @external
    totalOrdersPrices: Int @requires(fields: "userOrders { id }")
    aggregatedOrdersByStatus: Int @requires(fields: "userOrders { id }")
  }
`;

const resolvers = {
  User: {
    totalOrdersPrices({ userOrders }) {
      console.log({ userOrders });

      return 0;
    },
    aggregatedOrdersByStatus({ userOrders }) {
      console.log({ userOrders });

      return 1;
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

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
