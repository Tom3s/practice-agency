"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const StateModels_1 = require("../Model/StateModels");
const EstateRepo_1 = __importDefault(require("../Repos/EstateRepo"));
const fs_1 = __importDefault(require("fs"));
class Controller {
    constructor() {
        this.propertyRepo = new EstateRepo_1.default();
    }
    getResidentialSaleProperties(searchOptions = null) {
        if (searchOptions === null) {
            return this.propertyRepo.getAllSale();
        }
        return this.propertyRepo.getSaleFiltered(searchOptions);
    }
    getResidentialLettingProperties(searchOptions = null) {
        if (searchOptions === null) {
            return this.propertyRepo.getAllLetting();
        }
        return this.propertyRepo.getLettingFiltered(searchOptions);
    }
    getLocations(transactionType) {
        if (transactionType === 1) {
            return this.propertyRepo.getAllSaleLocations();
        }
        return this.propertyRepo.getAllLettingLocations();
    }
    getTypes(transactionType) {
        if (transactionType === 1) {
            return this.propertyRepo.getAllSaleTypes();
        }
        return this.propertyRepo.getAllLettingTypes();
    }
    getMedia(typeId, mediaName) {
        var filePath = '../../src';
        if (typeId === 1) {
            // return new Result(
            // 	true,
            // 	'Operation successful',
            // 	200,
            // 	`/images/property/${mediaName}`
            // )
            filePath += `/images/property/${mediaName}`;
        }
        else if (typeId === 2) {
            // return new Result(
            // 	true,
            // 	'Operation successful',
            // 	200,
            // 	`/images/floorplan/${mediaName}`
            // )
            filePath += `/images/floorplan/${mediaName}`;
        }
        else if (typeId === 3) {
            // return new Result(
            // 	true,
            // 	'Operation successful',
            // 	200,
            // 	`/images/epc/${mediaName}`
            // )
            filePath += `/images/epc/${mediaName}`;
        }
        else if (typeId === 5) {
            // return new Result(
            // 	true,
            // 	'Operation successful',
            // 	200,
            // 	`/media/brochure/${mediaName}`
            // )
            filePath += `/images/brochure/${mediaName}`;
        }
        console.log(filePath);
        if (filePath === '../../src') {
            return new StateModels_1.Result(false, 'Invalid media type', 400);
        }
        filePath = path_1.default.join(__dirname, filePath);
        if (!fs_1.default.existsSync(filePath)) {
            return new StateModels_1.Result(false, 'File not found', 404);
        }
        return new StateModels_1.Result(true, 'Operation successful', 200, filePath);
    }
    validateApiKey(apiKey) {
        // TODO: Remove this line
        return new StateModels_1.Result(true, 'Operation successful', 200, true);
        if (apiKey !== process.env.API_KEY) {
            return new StateModels_1.Result(false, 'Invalid API key', 401, false);
        }
        return new StateModels_1.Result(true, 'Operation successful', 200, true);
    }
}
exports.default = Controller;
