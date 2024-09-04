const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
    extend schema
    @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key"]
    )

    type User @key(fields: "id") {
        id: ID!
        externalField: String!
    }
`;

const resolvers = {
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
