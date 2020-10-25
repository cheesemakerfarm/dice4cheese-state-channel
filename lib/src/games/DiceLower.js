"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var index_1 = require("../index");
var utilities_1 = require("./utilities");
function throwOnInvalidNum(num) {
    if (num <= 0 || num >= index_1.RANGE) {
        throw new Error("Invalid number " + num);
    }
}
var DiceLower = /** @class */ (function () {
    function DiceLower() {
    }
    DiceLower.prototype.maxBet = function (num, bankRoll) {
        throwOnInvalidNum(num);
        var winProbability = new bn_js_1.default(num * index_1.PROBABILITY_DIVISOR).divn(index_1.RANGE).toNumber();
        return utilities_1.maxBetFromProbability(winProbability, bankRoll);
    };
    DiceLower.prototype.resultNumber = function (serverSeed, userSeed) {
        var randomNumber = utilities_1.generateRandomNumber(serverSeed, userSeed);
        return randomNumber.modn(index_1.RANGE);
    };
    DiceLower.prototype.userProfit = function (num, betValue, resultNumber) {
        throwOnInvalidNum(num);
        var won = resultNumber < num;
        if (won) {
            var totalWon = new bn_js_1.default(betValue).muln(index_1.RANGE).divn(num);
            return utilities_1.profitFromTotalWon(totalWon, betValue);
        }
        else {
            return -betValue;
        }
    };
    DiceLower.prototype.maxUserProfit = function (num, betValue) {
        var totalWon = new bn_js_1.default(betValue).muln(index_1.RANGE).divn(num);
        return utilities_1.profitFromTotalWon(totalWon, betValue);
    };
    return DiceLower;
}());
exports.default = DiceLower;
//# sourceMappingURL=DiceLower.js.map