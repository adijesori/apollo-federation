import { defineConfig } from '@graphql-hive/gateway';
import { useGraphQLMiddleware } from '@envelop/graphql-middleware';

export const gatewayConfig = defineConfig({
    plugins: () => [
        useGraphQLMiddleware([
            loggingMiddleware
        ])
    ]
})

async function loggingMiddleware(resolve, root, args, context, info) {
    console.log("Arguments:", args);
    const result = await resolve(root, args, context, info);
    console.log("Result:", result);
    return result;
}