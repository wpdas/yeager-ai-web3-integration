"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const health_check_1 = __importDefault(require("./health-check"));
const metadata_1 = __importDefault(require("./metadata"));
const initRoutes = (server) => {
    server.use('/api/health-check', health_check_1.default);
    server.use('/api/metadata', metadata_1.default);
};
exports.initRoutes = initRoutes;
