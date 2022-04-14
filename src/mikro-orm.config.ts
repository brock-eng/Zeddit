import { __prod__ } from "./constants";
import { Post } from "./entitites/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

// console.log("dirname: ", __dirname);

export default {
    entities: [Post],
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