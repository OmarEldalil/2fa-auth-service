"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URL = void 0;
exports.DB_URL = process.env.DB_URL || "postgresql://postgres:secret@localhost:5432/orders";
