const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
    extend schema
    @link(
        url: "https://specs.apollo.dev/federation/v2.5"
        import: ["@key"]
    )

    type Query {
        hello: String!
        helloNew: String!
    }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello from service';
    },
    helloNew() {
      return 'Hello new from service';
    },
    hello4() {
      return 'Hello3 from service';
    }
  }
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
