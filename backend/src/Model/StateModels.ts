// class Result {
// 	// public success: boolean;
// 	// public message: string;
// 	// public status: number;
// 	constructor(
// 		public success: boolean,
// 		public message: string,
// 		public status: number,
// 		public data?: any,
// 	){}
// }

class Result<T> {
	constructor(
		public success: boolean,
		public message: string,
		public status: number,
		public data?: T,
	){}
}

export { Result };