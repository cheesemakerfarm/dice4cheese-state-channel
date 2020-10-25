"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var index_1 = require("../index");
var utilities_1 = require("./utilities");
function throwOnInvalidNum(num) {
    if (num < 0 || num > 1) {
        throw new Error("Invalid number " + num);
    }
}
var FlipACoin = /** @class */ (function () {
    function FlipACoin() {
    }
    FlipACoin.prototype.maxBet = function (num, bankRoll) {
        throwOnInvalidNum(num);
        var winProbability = new bn_js_1.default(index_1.PROBABILITY_DIVISOR).divn(2).toNumber();
        return utilities_1.maxBetFromProbability(winProbability, bankRoll);
    };
    FlipACoin.prototype.resultNumber = function (serverSeed, userSeed) {
        var randomNumber = utilities_1.generateRandomNumber(serverSeed, userSeed);
        return randomNumber.modn(2);
    };
    FlipACoin.prototype.userProfit = function (num, betValue, resultNumber) {
        throwOnInvalidNum(num);
        var won = resultNumber === num;
        if (won) {
            var totalWon = new bn_js_1.default(betValue).muln(2);
            return utilities_1.profitFromTotalWon(totalWon, betValue);
        }
        else {
            return -betValue;
        }
    };
    FlipACoin.prototype.maxUserProfit = function (num, betValue) {
        var totalWon = new bn_js_1.default(betValue).muln(2);
        return utilities_1.profitFromTotalWon(totalWon, betValue);
    };
    return FlipACoin;
}());
exports.default = FlipACoin;
//# sourceMappingURL=FlipACoin.js.map