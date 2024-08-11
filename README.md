# Apollo Federation Example

Start Federation using @graphql-tools/federation:

```bash
npm start
```

Then visit `http://localhost:4000`
Service runs on `http://localhost:4001`
Service2 runs on `http://localhost:4002`
Service3 runs on `http://localhost:4003`

Run the following GQL query:
```graphql
    query User {
        user {
            aggregatedOrdersByStatus
            totalOrdersPrices
        }
    }
```

Check the logs and you'll see:
```
[2] { lastName: undefined }
[1] { userOrders: null }
[1] { userOrders: null }
```

(Even though it should've printed with the `lastName` due to [this](https://github.com/adijesori/apollo-federation/blob/807d7e0634abb47d18d807143b1dfa869275fd7a/service2/server.js#L26) and [this](https://github.com/adijesori/apollo-federation/blob/807d7e0634abb47d18d807143b1dfa869275fd7a/service2/server.js#L18))

Start Federation using ApolloGateway:

```bash
npm run start:apollo
```

Check the logs and you'll see:
```
[2] { lastName: 'Dawkins' }
[1] { userOrders: [ { id: 'Dawkins1' } ] }
[1] { userOrders: [ { id: 'Dawkins1' } ] }
``` 
