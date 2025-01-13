require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { SupergraphSchemaManager } = require('@graphql-tools/federation');
const { execute } = require('graphql');
const {
  typeDefs: gatewayCustomTypedefs,
  resolvers: gatewayCustomResolvers,
} = require('./link/gateway-to-user');

async function loggingMiddleware(resolve, root, args, context, info) {
  console.log('Arguments:', args);
  const result = await resolve(root, args, context, info);
  console.log('Result:', result);
  return result;
}

(async () => {
  class ManagedFederationStitchedGateway {
    constructor() {
      this.manager = new SupergraphSchemaManager({
        onStitchingOptions(opts) {
          opts.typeDefs = gatewayCustomTypedefs;
          opts.resolvers = gatewayCustomResolvers;
        },
      });
    }

    onSchemaLoadOrUpdate(updateSchema) {
      this.manager.addEventListener('schema', ({ detail: { schema, supergraphSdl } }) => {
        updateSchema({
          coreSupergraphSdl: supergraphSdl,
          apiSchema: applyMiddleware(schema, {
            Query: loggingMiddleware,
          }),
        });
      });
      this.manager.addEventListener('log', ({ detail: { source, level, message } }) => {
        console[level](`[Managed Federation] ${level} ${source} | ${message}`);
      });
      this.manager.addEventListener('failure', err => {
        console.error('[Managed Federation]', 'Schema loading failure:', err);
      });
    }

    load() {
      this.manager.start();
      return new Promise(resolve => {
        // We wait for the first schema here
        this.manager.addEventListener('schema', () => {
          resolve({
            executor(ctx) {
              return execute({
                schema: ctx.schema,
                document: ctx.document,
                operationName: ctx.operationName,
                variableValues: ctx.request.variables,
                contextValue: ctx.context,
              });
            },
          })
        }, { once: true })
      });
    }

    stop() {
      this.manager.stop();
    }
  }

  const server = new ApolloServer({
    gateway: new ManagedFederationStitchedGateway(),
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
