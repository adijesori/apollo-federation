# Apollo Federation Example

Create `hive-gateway-express/.env` file with the following content:

```
APOLLO_KEY=YourApolloKey
APOLLO_GRAPH_REF=YourApolloGraphRef
```

Start using:

```bash
npm start
```

Run some this in the playground:
```
query {
    hello
}
```

It will fail with the following error:
```
ERROR  TypeError: DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function errored synchronously: Error: Cannot find module '@graphql-mesh/transport-http'
Require stack:
- /Users/ori/WebstormProjects/apollo-federation/hive-gateway-express/node_modules/@graphql-mesh/fusion-runtime/dist/index.cjs
- /Users/ori/WebstormProjects/apollo-federation/hive-gateway-express/node_modules/@graphql-hive/gateway-runtime/dist/index.cjs
- /Users/ori/WebstormProjects/apollo-federation/hive-gateway-express/index.ts.
    at dispatchBatch (/Users/ori/WebstormProjects/apollo-federation/hive-gateway-express/node_modules/dataloader/index.js:290:42)
    at /Users/ori/WebstormProjects/apollo-federation/hive-gateway-express/node_modules/dataloader/index.js:268:5
    at processTicksAndRejections (node:internal/process/task_queues:77:11) {
```
