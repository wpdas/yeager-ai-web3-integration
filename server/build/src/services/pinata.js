"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinata = void 0;
const pinata_web3_1 = require("pinata-web3");
const constants_1 = require("../constants");
exports.pinata = new pinata_web3_1.PinataSDK({
    pinataJwt: constants_1.PINATA_JWT,
    pinataGateway: constants_1.PINATA_GATEWAY_URL,
});
