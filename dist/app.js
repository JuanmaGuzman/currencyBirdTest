"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json()); // Middleware to parse JSON in request body
// Define your routes
app.use('/api', apiRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
