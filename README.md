# Apollo Federation Example

Create `gateway/.env` and `apollo-gateway/.env` files with the following content:

```
APOLLO_KEY=YourApolloKey
APOLLO_GRAPH_REF=YourApolloGraphRef
```

Start Federation using @graphql-tools/federation:

```bash
npm start
```

If will fail with the following error:
```
Error: Expected undefined to be a GraphQL schema.
    at assertSchema (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/graphql/type/schema.js:37:11)
    at validateSchema (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/graphql/type/validate.js:34:28)
    at assertValidSchema (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/graphql/type/validate.js:56:18)
    at assertValidExecutionArguments (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/graphql/execution/execute.js:194:35)
    at execute (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/graphql/execution/execute.js:113:3)
    at generateSchemaHash (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/apollo-server-core/dist/utils/schemaHash.js:15:44)
    at ApolloServer.generateSchemaDerivedData (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/apollo-server-core/dist/ApolloServer.js:382:64)
    at SchemaManager.schemaDerivedDataProvider (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/apollo-server-core/dist/ApolloServer.js:156:65)
    at SchemaManager.processSchemaLoadOrUpdateEvent (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/apollo-server-core/dist/utils/schemaManager.js:100:103)
    at SchemaManager.start (/Users/ori/WebstormProjects/apollo-federation/gateway/node_modules/apollo-server-core/dist/utils/schemaManager.js:46:22)
```

Start Federation using ApolloGateway:

```bash
npm run start:apollo
```

It will work as expected.
