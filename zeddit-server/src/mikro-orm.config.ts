import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { Post } from "./entities/Post";
import { User } from "./entities/User";

// console.log("dirname: ", __dirname);

export default {
    entities: [Post, User],
    dbName: 'lireddit',
    user: 'postgres',
    password: 'Luigimario1',
    type: 'postgresql',
    debug: !__prod__,
    allowGlobalContext: true,
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    }
} as Parameters<typeof MikroORM.init>[0];