import path from "path";
import { Address, Property, PropertyType, SearchOptions } from "../Model/EntityModels";
import { Result } from "../Model/StateModels";

function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

class PropertyRepo {
	
	private list: Property[];

	constructor() {
		const filePath = path.join(__dirname, '../../src/Data/Properties.json');


		this.list = require(filePath) as Property[];

		for (const property of this.list) {
			property.fileUrl = '/media/';
		}
	}

	getAllSale(): Result<Property[]> {

		const saleListings: Property[] = this.list.filter((property: Property) => {
			return property?.forSale;
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

	getAllLetting(): Result<Property[]> {
		
		const lettingListings: Property[] = this.list.filter((property: Property) => {
			return !property?.forSale;
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

	getSaleFiltered(searchOptions: SearchOptions): Result<Property[]> {
		const saleListings: Property[] = this.getAllSale().data as Property[];

		const filteredListings: Property[] = saleListings.filter((property: Property) => {
			if (searchOptions.location) {
				return property.address?.town?.toLowerCase() === searchOptions.location?.toLowerCase();
			}

			if (searchOptions.maxPrice) {
				return property.price <= searchOptions.maxPrice;
			}

			if (searchOptions.bedrooms) {
				return property?.bedrooms >= searchOptions.bedrooms;
			}

			if (searchOptions.type) {
				for (const type of searchOptions.type) {
					if (!property.type?.filter(propertyType => propertyType?.id === type).length) {
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

	getLettingFiltered(searchOptions: SearchOptions): Result<Property[]> {
		const lettingListings: Property[] = this.list.filter((property: Property) => {
			return !property.forSale;
		});

		const filteredListings: Property[] = lettingListings.filter((property: Property) => {
			if (searchOptions.location) {
				return property.address?.town?.toLowerCase() === searchOptions.location?.toLowerCase();
			}

			if (searchOptions.maxPrice) {
				return property.price <= searchOptions.maxPrice;
			}
			
			if (searchOptions.bedrooms) {
				return property?.bedrooms >= searchOptions.bedrooms;
			}

			if (searchOptions.type) {
				for (const type of searchOptions.type) {
					if (!property.type?.filter(propertyType => propertyType?.id === type).length) {
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

	getAllSaleLocations(): Result<string[]> {
		const saleListings: Property[] = this.getAllSale().data as Property[];

		const locations: string[] = saleListings.map((property: Property) => {	
			return property?.address?.town;
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

	getAllLettingLocations(): Result<string[]> {
		const lettingListings: Property[] = this.getAllLetting().data as Property[];

		const locations: string[] = lettingListings.map((property: Property) => {	
			return property?.address?.town;
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
		const saleListings: Property[] = this.getAllSale().data as Property[];

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
		const lettingListings: Property[] = this.getAllLetting().data as Property[];

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