const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const serviceList = [
  { name: 'Users', url: 'http://localhost:4001' },
  { name: 'Products', url: 'http://localhost:4002' },
];

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: serviceList,
  })
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
