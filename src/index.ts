import { MikroORM } from "@mikro-orm/core";
import { DebugInfo, DebugError, __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import { MyContext } from "./types";

import session from 'express-session';
import pgConnect from 'connect-pg-simple';
import pool from 'pg';


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const pgClient = pgConnect(session);
    DebugInfo("Test");
    const pgPool = new pool.Pool({
        // Pool options
    });

    app.use(
        session({
            name: 'sid',
            store: new pgClient({
                pool : pgPool,
                tableName : "user_sessions",
                fart : 
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax',
                secure: __prod__
            },
            secret: "fart",
            resave: false,
        })
    );
        
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}): MyContext => ({em: orm.em, req, res})
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
