"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateRepo = void 0;
class RealEstateRepo {
    constructor() {
        const filePath = path.join(__dirname, 'data/Properies.json');
        list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    getAll() {
    }
}
exports.RealEstateRepo = RealEstateRepo;
