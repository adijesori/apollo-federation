import 'dotenv/config';
import express from 'express';
import { createGatewayRuntime } from "@graphql-hive/gateway-runtime";

const app = express()

const serveRuntime = createGatewayRuntime({
  // logging: 'debug',

  supergraph: {
    type: 'graphos',
  } as any
})

// Bind Hive Gateway to the graphql endpoint to avoid rendering the playground on any path
app.use(serveRuntime.graphqlEndpoint, serveRuntime)

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
