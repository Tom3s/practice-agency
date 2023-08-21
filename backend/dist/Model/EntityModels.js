"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOptions = exports.PropertyType = exports.Address = exports.Property = void 0;
class Property {
    constructor(id, name, address, description, price, type, bedrooms, bathrooms, forSale, media) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.price = price;
        this.type = type;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.forSale = forSale;
        this.media = media;
        this.fileUrl = '/media/';
    }
}
exports.Property = Property;
class Address {
    constructor(street, town, latitude, longitude) {
        this.street = street;
        this.town = town;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.Address = Address;
class PropertyType {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    equals(propertyType) {
        return this.id === propertyType.id;
    }
}
exports.PropertyType = PropertyType;
class Media {
    constructor(typeId, name) {
        this.typeId = typeId;
        this.name = name;
    }
}
// interface SearchOptions {
// 	location?: string,
// 	maxPrice?: number,
// 	type?: string,
// 	bedrooms?: number,
// }
class SearchOptions {
    constructor() { }
    addLocation(location) {
        this.location = location;
    }
    addMaxPrice(maxPrice) {
        this.maxPrice = maxPrice;
    }
    addType(type) {
        this.type = type.split(',').map((type) => {
            return parseInt(type);
        });
    }
    addBedrooms(bedrooms) {
        this.bedrooms = bedrooms;
    }
}
exports.SearchOptions = SearchOptions;
