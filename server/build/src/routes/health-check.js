"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_check_1 = require("../controllers/health-check");
const healthCheckRoutes = express_1.default.Router();
healthCheckRoutes.get('/', health_check_1.healthCheck);
exports.default = healthCheckRoutes;
