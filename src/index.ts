import { MikroORM } from "@mikro-orm/core";
import { DebugInfo, DebugError, __prod__ } from "./constants";
import { Post } from "./entitites/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const testVariable = new Post();
    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => {
        DebugInfo('Server started on port 4000');
    });
};

main().catch((err) => {
    DebugError(err);
});
