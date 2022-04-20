"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const Post_1 = require("./entities/Post");
exports.default = {
    entities: [Post_1.Post],
    dbName: 'lireddit',
    user: 'postgres',
    password: 'Luigimario1',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    allowGlobalContext: true,
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    }
};
//# sourceMappingURL=mikro-orm.config.js.map