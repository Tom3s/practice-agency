import path from "path";
import { Address, Property, PropertyType, SearchOptions } from "../Model/EntityModels";
import { Result } from "../Model/StateModels";

function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

class PropertyRepo {
	
	private list: Array<Property>;

	constructor() {
		const filePath = path.join(__dirname, '../../src/Data/Properties.json');


		this.list = require(filePath);

		for (const property of this.list) {
			property.fileUrl = '/media/';
		}
	}

	getAllSale(): Result<Array<Property>> {

		const saleListings: Array<Property> = this.list.filter((property: Property) => {
			return property.forSale;
		});

		if (saleListings.length === 0) {
			return new Result(
				false,
				'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.',
				404
			)
		}

		return new Result(
			true,
			'Opetation successful',
			200,
			deepCopy(saleListings)
		)
	}

	getAllLetting(): Result<Array<Property>> {
		
		const lettingListings: Array<Property> = this.list.filter((property: Property) => {
			return !property.forSale;
		});

		if (lettingListings.length === 0) {
			return new Result(
				false,
				'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.',
				404
			)
		}

		return new Result(
			true,
			'Opetation successful',
			200,
			deepCopy(lettingListings)
		)
	}

	getSaleFiltered(searchOptions: SearchOptions): Result<Array<Property>> {
		const saleListings: Array<Property> = this.list.filter((property: Property) => {
			return property.forSale;
		});

		const filteredListings: Array<Property> = saleListings.filter((property: Property) => {
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
			return new Result(
				false,
				'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.',
				404
			)
		}

		return new Result(
			true,
			'Opetation successful',
			200,
			deepCopy(filteredListings)
		)
	}

	getLettingFiltered(searchOptions: SearchOptions): Result<Array<Property>> {
		const lettingListings: Array<Property> = this.list.filter((property: Property) => {
			return !property.forSale;
		});

		const filteredListings: Array<Property> = lettingListings.filter((property: Property) => {
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
			return new Result(
				false,
				'Sorry, no listings have been found matching the criteria you entered. Please try again using a broader criteria.',
				404
			)
		}

		return new Result(
			true,
			'Opetation successful',
			200,
			deepCopy(filteredListings)
		)
	}

	getAllSaleLocations(): Result<Array<string>> {
		const saleListings: Array<Property> = this.getAllSale().data as Array<Property>;

		const locations: Array<string> = saleListings.map((property: Property) => {	
			return property.address.town;
		});

		const filteredLocations: string[] = locations.filter((location: string) => {
			return location !== undefined;
		});

		return new Result(
			true,
			'Opetation successful',
			200,
			filteredLocations
		)
	}

	getAllLettingLocations(): Result<Array<string>> {
		const lettingListings: Array<Property> = this.getAllLetting().data as Array<Property>;

		const locations: Array<string> = lettingListings.map((property: Property) => {	
			return property.address.town;
		});

		const filteredLocations: string[] = locations.filter((location: string) => {
			return location !== undefined;
		});

		return new Result(
			true,
			'Opetation successful',
			200,
			filteredLocations
		)
	}

	getAllSaleTypes(): Result<PropertyType[]> {
		const saleListings: Array<Property> = this.getAllSale().data as Array<Property>;

		const types: PropertyType[] = [];

		saleListings.forEach(property => {
			if (property.type !== undefined) {
				property.type.forEach(type => {
					if (!types.filter(propertyType => propertyType.id === type.id).length) {
						types.push(type);
					}
				});
			}
		});

		types.sort((a: PropertyType, b: PropertyType) => {
			return a.id - b.id;
		});

		return new Result(
			true,
			'Opetation successful',
			200,
			types
		)
	}

	getAllLettingTypes(): Result<PropertyType[]> {
		const lettingListings: Array<Property> = this.getAllLetting().data as Array<Property>;

		const types: PropertyType[] = [];

		lettingListings.forEach(property => {
			if (property.type !== undefined) {
				property.type.forEach(type => {
					if (!types.filter(propertyType => propertyType.id === type.id).length) {
						types.push(type);
					}
				});
			}
		});

		types.sort((a: PropertyType, b: PropertyType) => {
			return a.id - b.id;
		});

		return new Result(
			true,
			'Opetation successful',
			200,
			types
		)
	}
	
	getProperty(id: number): Result<Property> {
		const property: Property | undefined = this.list.find((property: Property) => {
			return property.id === id;
		});
		
		if (property === undefined) {
			return new Result(
				false,
				'Property not found',
				404
			)
		}

		return new Result(
			true,
			'Operation successful',
			200,
			property
		)
	}

}

export default PropertyRepo;