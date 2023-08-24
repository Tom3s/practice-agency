"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const SetupRoutes_1 = __importDefault(require("./Routes/SetupRoutes"));
const Controller_1 = __importDefault(require("./Controller/Controller"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const controller = new Controller_1.default();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
(0, SetupRoutes_1.default)(app, controller);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
