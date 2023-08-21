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
const EntityModels_1 = require("../Model/EntityModels");
function setupRoutes(app, controller) {
    app.get('/', (request, response) => {
        response.send('Express + TypeScript Server');
    });
    app.get('/v2/property/residential/sale', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const apiKey = request.query['api-key'];
        if (controller.validateApiKey(apiKey).data === false) {
            response.status(401).send('Invalid API key');
            return;
        }
        const searchOptions = new EntityModels_1.SearchOptions();
        if (request.query['location']) {
            searchOptions.addLocation(request.query['location']);
        }
        if (request.query['max-price']) {
            searchOptions.addMaxPrice(parseInt(request.query['max-price']));
        }
        if (request.query['prop-type']) {
            searchOptions.addType(request.query['prop-type']);
        }
        if (request.query['min-bed']) {
            searchOptions.addBedrooms(parseInt(request.query['min-bed']));
        }
        const result = yield controller.getResidentialSaleProperties(searchOptions);
        if (result.success) {
            response.status(result.status).send(result.data);
            return;
        }
        response.status(result.status).send(result.message);
    }));
    app.get('/v2/property/residential/letting', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const apiKey = request.query['api-key'];
        if (controller.validateApiKey(apiKey).data === false) {
            response.status(401).send('Invalid API key');
            return;
        }
        const searchOptions = new EntityModels_1.SearchOptions();
        if (request.query['location']) {
            searchOptions.addLocation(request.query['location']);
        }
        if (request.query['max-price']) {
            searchOptions.addMaxPrice(parseInt(request.query['max-price']));
        }
        if (request.query['prop-type']) {
            searchOptions.addType(request.query['prop-type']);
        }
        if (request.query['min-bed']) {
            searchOptions.addBedrooms(parseInt(request.query['min-bed']));
        }
        const result = yield controller.getResidentialLettingProperties(searchOptions);
        if (result.success) {
            response.status(result.status).send(result.data);
            return;
        }
        response.status(result.status).send(result.message);
    }));
    app.get('/v2/property/location', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const apiKey = request.query['api-key'];
        if (controller.validateApiKey(apiKey).data === false) {
            response.status(401).send('Invalid API key');
            return;
        }
        const transactionType = parseInt(request.query['transaction-type']);
        const result = yield controller.getLocations(transactionType);
        if (result.success) {
            response.status(result.status).send(result.data);
            return;
        }
        response.status(result.status).send(result.message);
    }));
    app.get('/v2/property/type', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const apiKey = request.query['api-key'];
        if (controller.validateApiKey(apiKey).data === false) {
            response.status(401).send('Invalid API key');
            return;
        }
        const transactionType = parseInt(request.query['transaction-type']);
        const result = yield controller.getTypes(transactionType);
        if (result.success) {
            response.status(result.status).send(result.data);
            return;
        }
        response.status(result.status).send(result.message);
    }));
    app.get('/v2/media/:typeId/:mediaName', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const apiKey = request.query['api-key'];
        if (controller.validateApiKey(apiKey).data === false) {
            response.status(401).send('Invalid API key');
            return;
        }
        const typeId = parseInt(request.params['typeId']);
        const mediaName = request.params['mediaName'];
        const result = yield controller.getMedia(typeId, mediaName);
        console.log(result.data);
        if (result.success) {
            response.status(result.status).sendFile(result.data);
            return;
        }
        response.status(result.status).send(result.message);
    }));
}
exports.default = setupRoutes;
