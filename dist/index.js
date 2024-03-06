"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const env_1 = __importDefault(require("@/data/env"));
const server_1 = __importDefault(require("@/lib/server"));
const app = (0, server_1.default)();
app.listen(env_1.default.PORT, () => {
    console.log(`Started at ${env_1.default.PORT}`);
});
