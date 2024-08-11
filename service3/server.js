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
        lastName: String! @external
        userOrders: [UserOrder!] @requires(fields: "lastName")
    }
`;

const resolvers = {
  User: {
    userOrders({ lastName }) {
      console.log({ lastName });

      if (lastName) {
        return [
          {
            id: `${lastName}1`,
          },
        ];
      }
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

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
