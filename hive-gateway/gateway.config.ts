import {defineConfig, GatewayPlugin} from "@graphql-hive/gateway";
import {useGraphQLMiddleware} from "@envelop/graphql-middleware";
import {
    typeDefs as gatewayCustomTypedefs, resolvers as gatewayCustomResolvers
} from "./link/gateway-to-user";

const GRAPHQL_PATH = "/";

const ApolloSandboxPlugin: GatewayPlugin = {
    onRequest({fetchAPI, request, url, endResponse}) {
        if (
            request.headers.get("accept")?.includes("text/html") &&
            url.pathname === GRAPHQL_PATH
        ) {
            return endResponse(
                new fetchAPI.Response(
                    `
                    <div style="width: 100%; height: 100%;" id='embedded-sandbox'></div>
                    <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script> 
                    <script>
                        new window.EmbeddedSandbox({
                            target: '#embedded-sandbox',
                            initialEndpoint: new URL(location.pathname, location.href).toString(),
                        });
                    </script>
            `,
                    {
                        headers: {
                            "content-type": "text/html",
                        },
                    }
                )
            );
        }
    },
};

export const gatewayConfig = defineConfig({
    additionalResolvers: gatewayCustomResolvers,
    additionalTypeDefs: gatewayCustomTypedefs,
    plugins: () => [
        useGraphQLMiddleware([loggingMiddleware]),
        ApolloSandboxPlugin,
    ],
    landingPage: false,
    graphqlEndpoint: GRAPHQL_PATH,
    graphiql: false,
});

async function loggingMiddleware(resolve, root, args, context, info) {
    console.log("Arguments:", args);
    const result = await resolve(root, args, context, info);
    console.log("Result:", result);
    return result;
}
