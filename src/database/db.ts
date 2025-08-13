import {DataSource} from "typeorm";
import {DB_URL} from "../config/app";
import {User} from "../models/user";

export const dataSource = new DataSource({
    url: DB_URL,
    type: "postgres",
    // for development purposes, Ideally we should have migrations in place
    synchronize: true,
    entities: [User],
})