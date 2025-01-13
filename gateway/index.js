require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { SupergraphSchemaManager } = require("@graphql-tools/federation");
const {
  typeDefs: gatewayCustomTypedefs,
  resolvers: gatewayCustomResolvers,
} = require("./link/gateway-to-user");

async function loggingMiddleware(resolve, root, args, context, info) {
  console.log("Arguments:", args);
  const result = await resolve(root, args, context, info);
  console.log("Result:", result);
  return result;
}

(async () => {
  const server = new ApolloServer({
    gateway: new SupergraphSchemaManager({
      onStitchingOptions(opts) {
        opts.typeDefs = gatewayCustomTypedefs;
        opts.resolvers = gatewayCustomResolvers;
      },
      onStitchedSchema(schema) {
        return applyMiddleware(schema, {
          Query: loggingMiddleware,
        });
      },
    }),
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
