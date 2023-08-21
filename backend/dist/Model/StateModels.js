"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(success, message, status, data) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
exports.Result = Result;
