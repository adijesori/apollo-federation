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

(Even though it should've printed with the `lastName` due to [this](https://github.com/adijesori/apollo-federation/blob/1971c917a5847a59c24ccc9a5046ef55ece4791b/service3/server.js#L25) and [this](https://github.com/adijesori/apollo-federation/blob/1971c917a5847a59c24ccc9a5046ef55ece4791b/service3/server.js#L18))

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
