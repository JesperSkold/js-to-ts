"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const actorRouter_1 = __importDefault(require("./routes/actorRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/actor', actorRouter_1.default);
const port = 3030;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
