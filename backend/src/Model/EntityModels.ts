class Property {
	public fileUrl: string = '/media/';
	constructor(
		public id: number,
		public name: string,
		public address: Address,
		public description: string,
		public price: number,
		public type: PropertyType[],
		public bedrooms: number,
		public bathrooms: number,
		public forSale: boolean,
		public media: Media[],
	){}
}

class Address {
	constructor(
		public street: string,
		public town: string,
		public latitude: number,
		public longitude: number,
	){}
}

class PropertyType {
	constructor(
		public id: number,
		public name: string,
	){}

	equals(propertyType: PropertyType): boolean {
		return this.id === propertyType.id;
	}
}

class Media {
	constructor(
		public typeId: number,
		public name: string,
	){}
}

// interface SearchOptions {
// 	location?: string,
// 	maxPrice?: number,
// 	type?: string,
// 	bedrooms?: number,
// }

class SearchOptions {
	public location?: string;
	public maxPrice?: number;
	public type?: number[];
	public bedrooms?: number;

	constructor(){}

	addLocation(location: string): void {
		this.location = location;
	}

	addMaxPrice(maxPrice: number): void {
		this.maxPrice = maxPrice;
	}

	addType(type: string): void {
		this.type = type.split(',').map((type: string) => {
			return parseInt(type);
		});
	}

	addBedrooms(bedrooms: number): void {
		this.bedrooms = bedrooms;
	}
}

export { Property, Address, PropertyType, SearchOptions };