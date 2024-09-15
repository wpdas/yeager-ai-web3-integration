"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metadata_1 = require("../controllers/metadata");
const validation_1 = require("../middewares/validation");
const metadataRoutes = express_1.default.Router();
metadataRoutes.post('/create', (0, validation_1.validateData)(metadata_1.createMetadataSchema), metadata_1.createMetadata);
exports.default = metadataRoutes;
