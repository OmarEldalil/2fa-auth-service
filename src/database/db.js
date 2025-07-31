"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
var app_1 = require("../config/app");
exports.dataSource = new typeorm_1.DataSource({
    url: app_1.DB_URL,
    type: "postgres",
    synchronize: true,
    entities: ["src/models/*.ts"],
});
