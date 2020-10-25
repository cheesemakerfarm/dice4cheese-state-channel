"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var ethUtil = __importStar(require("ethereumjs-util"));
var index_1 = require("../index");
function maxBetFromProbability(winProbability, bankRoll) {
    var houseEdge = new bn_js_1.default(index_1.HOUSE_EDGE);
    var probabilityDivisor = new bn_js_1.default(index_1.PROBABILITY_DIVISOR);
    var tmp1 = probabilityDivisor.muln(index_1.HOUSE_EDGE_DIVISOR).divn(winProbability);
    var tmp2 = probabilityDivisor.mul(houseEdge).divn(winProbability);
    var enumerator = houseEdge.mul(new bn_js_1.default(bankRoll));
    var denominator = tmp1.sub(tmp2).subn(index_1.HOUSE_EDGE_DIVISOR);
    if (denominator.ltn(0)) {
        throw new Error("Invalid winProbability!");
    }
    return enumerator.div(denominator).toNumber();
}
exports.maxBetFromProbability = maxBetFromProbability;
function generateRandomNumber(serverSeed, userSeed) {
    var serverSeedBuf = ethUtil.toBuffer(serverSeed);
    var userSeedBuf = ethUtil.toBuffer(userSeed);
    var seed = ethUtil.sha3(Buffer.concat([serverSeedBuf, userSeedBuf]));
    var hexSeed = seed.toString("hex");
    return new bn_js_1.default(hexSeed, 16);
}
exports.generateRandomNumber = generateRandomNumber;
function profitFromTotalWon(totalWon, betValue) {
    var houseEdge = totalWon.muln(index_1.HOUSE_EDGE).divn(index_1.HOUSE_EDGE_DIVISOR);
    return totalWon
        .sub(houseEdge)
        .sub(new bn_js_1.default(betValue))
        .toNumber();
}
exports.profitFromTotalWon = profitFromTotalWon;
//# sourceMappingURL=utilities.js.map