"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const StateModels_1 = require("../Model/StateModels");
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
class PropertyRepo {
    constructor() {
        const filePath = path_1.default.join(__dirname, '../../src/Data/Properties.json');
        this.list = require(filePath);
        for (const property of this.list) {
            property.fileUrl = '/media/';
        }
    }
    getAllSale() {
        const saleListings = this.list.filter((property) => {
            return property.forSale;
        });
        if (saleListings.length === 0) {
            return new StateModels_1.Result(false, 'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.', 404);
        }
        return new StateModels_1.Result(true, 'Opetation successful', 200, deepCopy(saleListings));
    }
    getAllLetting() {
        const lettingListings = this.list.filter((property) => {
            return !property.forSale;
        });
        if (lettingListings.length === 0) {
            return new StateModels_1.Result(false, 'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.', 404);
        }
        return new StateModels_1.Result(true, 'Opetation successful', 200, deepCopy(lettingListings));
    }
    getSaleFiltered(searchOptions) {
        const saleListings = this.list.filter((property) => {
            return property.forSale;
        });
        const filteredListings = saleListings.filter((property) => {
            if (searchOptions.location !== undefined) {
                if (property.address.town === undefined) {
                    return false;
                }
                if (property.address.town.toLowerCase() !== searchOptions.location.toLowerCase()) {
                    return false;
                }
            }
            if (searchOptions.maxPrice !== undefined) {
                if (property.price > searchOptions.maxPrice) {
                    return false;
                }
            }
            if (searchOptions.bedrooms !== undefined) {
                if (property.bedrooms === undefined) {
                    return false;
                }
                if (property.bedrooms < searchOptions.bedrooms) {
                    return false;
                }
            }
            if (searchOptions.type !== undefined) {
                for (const type of searchOptions.type) {
                    if (!property.type.filter(propertyType => propertyType.id === type).length) {
                        return false;
                    }
                }
            }
            return true;
        });
        if (filteredListings.length === 0) {
            return new StateModels_1.Result(false, 'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.', 404);
        }
        return new StateModels_1.Result(true, 'Opetation successful', 200, deepCopy(filteredListings));
    }
    getLettingFiltered(searchOptions) {
        const lettingListings = this.list.filter((property) => {
            return !property.forSale;
        });
        const filteredListings = lettingListings.filter((property) => {
            if (searchOptions.location !== undefined) {
                if (property.address.town === undefined) {
                    return false;
                }
                if (property.address.town.toLowerCase() !== searchOptions.location.toLowerCase()) {
                    return false;
                }
            }
            if (searchOptions.maxPrice !== undefined) {
                if (property.price > searchOptions.maxPrice) {
                    return false;
                }
            }
            if (searchOptions.bedrooms !== undefined) {
                if (property.bedrooms === undefined) {
                    return false;
                }
                if (property.bedrooms < searchOptions.bedrooms) {
                    return false;
                }
            }
            if (searchOptions.type !== undefined) {
                for (const type of searchOptions.type) {
                    if (!property.type.filter(propertyType => propertyType.id === type).length) {
                        return false;
                    }
                }
            }
            return true;
        });
        if (filteredListings.length === 0) {
            return new StateModels_1.Result(false, 'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.', 404);
        }
        return new StateModels_1.Result(true, 'Opetation successful', 200, deepCopy(filteredListings));
    }
    getAllSaleLocations() {
        const saleListings = this.getAllSale().data;
        const locations = saleListings.map((property) => {
            return property.address.town;
        });
        return new StateModels_1.Result(true, 'Opetation successful', 200, locations);
    }
    getAllLettingLocations() {
        const lettingListings = this.getAllLetting().data;
        const locations = lettingListings.map((property) => {
            return property.address.town;
        });
        return new StateModels_1.Result(true, 'Opetation successful', 200, locations);
    }
    getAllSaleTypes() {
        const saleListings = this.getAllSale().data;
        const types = [];
        saleListings.forEach(property => {
            if (property.type !== undefined) {
                property.type.forEach(type => {
                    if (!types.filter(propertyType => propertyType.id === type.id).length) {
                        types.push(type);
                    }
                });
            }
        });
        types.sort((a, b) => {
            return a.id - b.id;
        });
        return new StateModels_1.Result(true, 'Opetation successful', 200, types);
    }
    getAllLettingTypes() {
        const lettingListings = this.getAllLetting().data;
        const types = [];
        lettingListings.forEach(property => {
            if (property.type !== undefined) {
                property.type.forEach(type => {
                    if (!types.filter(propertyType => propertyType.id === type.id).length) {
                        types.push(type);
                    }
                });
            }
        });
        types.sort((a, b) => {
            return a.id - b.id;
        });
        return new StateModels_1.Result(true, 'Opetation successful', 200, types);
    }
}
exports.default = PropertyRepo;
