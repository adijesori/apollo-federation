require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const { SupergraphSchemaManager } = require('@graphql-tools/federation');
const { execute } = require('graphql');
(async () => {
  class ManagedFederationStitchedGateway {
    constructor() {
      this.manager = new SupergraphSchemaManager();
    }

    onSchemaLoadOrUpdate(updateSchema) {
      this.manager.addEventListener('schema', (schema, sdl) => {
        updateSchema({
          coreSupergraphSdl: sdl,
          apiSchema: schema,
        });
      });
      this.manager.addEventListener('log', ({ source, level, message }) => {
        console[level](`[Managed Federation] ${source} | ${message}`);
      });
      this.manager.addEventListener('failure', err => {
        console.error('[Managed Federation]', 'Schema loading failure:', err);
      });
    }

    load() {
      this.manager.start();

      return {
        executor(ctx) {
          return execute({
            schema: ctx.schema,
            document: ctx.document,
            operationName: ctx.operationName,
            variableValues: ctx.request.variables,
            contextValue: ctx.context,
          });
        },
      };
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
