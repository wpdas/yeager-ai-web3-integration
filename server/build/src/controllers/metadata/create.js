"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadata = exports.createMetadataSchema = void 0;
const zod_1 = require("zod");
const services_1 = require("../../services");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../../constants");
exports.createMetadataSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    imageCID: zod_1.z.string(),
});
const createMetadata = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, imageCID } = request.body;
    try {
        // INFO: Pinata said I used my plan limits when I uploaded only two files
        // and used 67kb from 10GB from my Gateway Bandwidth
        // Using new account (wpdas@yahoo.com)
        const upload = yield services_1.pinata.upload.json({
            name,
            description,
            // INFO: stores the image CID only, so that the client decides which gateway to use
            // image: `ipfs://${imageCID}`,
            image: `${constants_1.PINATA_GATEWAY_FORMATTED_URL}${imageCID}`,
            preview_image: `${constants_1.PINATA_GATEWAY_FORMATTED_URL}${imageCID}`,
        });
        return response.send({ tokenCID: upload.IpfsHash });
    }
    catch (error) {
        console.log(error);
        response
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal Server Error' });
    }
});
exports.createMetadata = createMetadata;
