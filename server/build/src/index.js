"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const constants_1 = require("./constants");
const serverCors = (0, cors_1.default)({
    origin: constants_1.NODE_ENV === 'development'
        ? '*'
        : 'https://yeager-ai-web3-integration.vercel.app',
});
const server = (0, express_1.default)();
server.use(serverCors);
server.use(express_1.default.json());
(0, routes_1.initRoutes)(server);
server.on('error', () => {
    process.exit(1);
});
server.on('close', () => {
    process.exit(1);
});
server.listen(constants_1.PORT, () => console.log(`Server running on port ${constants_1.PORT}`));
