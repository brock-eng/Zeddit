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
import { conObject } from "./env";
import pgConnect from 'connect-pg-simple';
import client from 'pg';
import { ClientRequest } from "http";


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    // session store and session config
    const pgSession = require('connect-pg-simple')(session);
    const store = new pgSession({
        conObject,
    })

    app.use(
        session({
            name: 'sid',
            store: store,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: false,
                sameSite: 'lax',
                secure: true
            },
            saveUninitialized: false,
            secret: "fart",
            resave: false,
        })
    );
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        introspection: true,
        context: ({req, res}): MyContext => ({em: orm.em, req, res})
    });
    await apolloServer.start();
    const cors = {
        credentials: true,
        origin: 'http://localhost:3000'
    }
    apolloServer.applyMiddleware({ app, cors});

    const port = 4000;
    app.listen(port, () => {
        DebugInfo('Server started on port ' + port);
    });
};

main().catch((err) => {
    DebugError(err);
});
