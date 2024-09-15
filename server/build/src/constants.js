"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PINATA_GATEWAY_FORMATTED_URL = exports.PINATA_GATEWAY_URL = exports.PINATA_JWT = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Init env vars
dotenv_1.default.config();
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT || 3001;
exports.PINATA_JWT = process.env.PINATA_JWT;
exports.PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;
exports.PINATA_GATEWAY_FORMATTED_URL = `https://${exports.PINATA_GATEWAY_URL}/ipfs/`;
