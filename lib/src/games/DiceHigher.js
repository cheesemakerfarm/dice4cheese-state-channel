"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var index_1 = require("../index");
var utilities_1 = require("./utilities");
function throwOnInvalidNum(num) {
    if (num < 0 || num + 1 >= index_1.RANGE) {
        throw new Error("Invalid number " + num);
    }
}
var DiceHigher = /** @class */ (function () {
    function DiceHigher() {
    }
    DiceHigher.prototype.maxBet = function (num, bankRoll) {
        throwOnInvalidNum(num);
        var winProbability = new bn_js_1.default((index_1.RANGE - num - 1) * index_1.PROBABILITY_DIVISOR)
            .divn(index_1.RANGE)
            .toNumber();
        return utilities_1.maxBetFromProbability(winProbability, bankRoll);
    };
    DiceHigher.prototype.resultNumber = function (serverSeed, userSeed, betNum) {
        var randomNumber = utilities_1.generateRandomNumber(serverSeed, userSeed);
        return randomNumber.modn(index_1.RANGE);
    };
    DiceHigher.prototype.userProfit = function (num, betValue, resultNum) {
        throwOnInvalidNum(num);
        var won = resultNum > num;
        if (won) {
            var totalWon = new bn_js_1.default(betValue)
                .muln(index_1.RANGE)
                .divn(index_1.RANGE - num - 1);
            return utilities_1.profitFromTotalWon(totalWon, betValue);
        }
        else {
            return -betValue;
        }
    };
    DiceHigher.prototype.maxUserProfit = function (num, betValue) {
        var totalWon = new bn_js_1.default(betValue)
            .muln(index_1.RANGE)
            .divn(index_1.RANGE - num - 1);
        return utilities_1.profitFromTotalWon(totalWon, betValue);
    };
    return DiceHigher;
}());
exports.default = DiceHigher;
//# sourceMappingURL=DiceHigher.js.map