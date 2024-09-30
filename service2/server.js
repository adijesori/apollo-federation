const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.5"
      import: ["@key", "@requires", "@external"]
    )
  
  type User @key(fields: "id") {
    id: ID!
    externalField: String! @external
    requiresField: SomeRequiredType @requires(fields: "externalField")
  }
  
  type SomeRequiredType {
      id: String
  }
  
  type SomeTypeWithDisappearingField {
    otherField: String
    disappearingField: [SomeRequiredType]
  }
  
  type Query {
    someResolver: SomeTypeWithDisappearingField
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

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
