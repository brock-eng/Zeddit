import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import {Request, Response, Express} from "express";

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
}


declare module "express-session" {
    export interface SessionData {
        userId: number;
    }
}