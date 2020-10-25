"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChooseFrom12_1 = __importDefault(require("./ChooseFrom12"));
var DiceHigher_1 = __importDefault(require("./DiceHigher"));
var DiceLower_1 = __importDefault(require("./DiceLower"));
var FlipACoin_1 = __importDefault(require("./FlipACoin"));
var Keno_1 = __importDefault(require("./Keno"));
var Wheel_1 = __importDefault(require("./Wheel"));
var games = {
    1: new DiceLower_1.default(),
    2: new DiceHigher_1.default(),
    3: new ChooseFrom12_1.default(),
    4: new FlipACoin_1.default(),
    5: new Keno_1.default(),
    6: new Wheel_1.default(),
};
function getGameImplementation(gameType) {
    if (!(gameType in games)) {
        throw new Error("Unknown gameType " + gameType);
    }
    return games[gameType];
}
exports.getGameImplementation = getGameImplementation;
//# sourceMappingURL=index.js.map