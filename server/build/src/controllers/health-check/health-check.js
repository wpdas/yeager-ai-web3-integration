"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (_, response) => {
    response.json({
        message: 'Server is fine!',
    });
};
exports.healthCheck = healthCheck;
