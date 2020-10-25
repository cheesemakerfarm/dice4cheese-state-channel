"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var index_1 = require("../index");
var utilities_1 = require("./utilities");
function throwOnInvalidNum(num) {
    // tslint:disable-next-line:no-bitwise
    if (num <= 0 || num >= (1 << index_1.CHOOSE_FROM_12_NUMS) - 1) {
        throw new Error("Invalid number " + num);
    }
}
var ChooseFrom12 = /** @class */ (function () {
    function ChooseFrom12() {
    }
    ChooseFrom12.prototype.maxBet = function (num, bankRoll) {
        throwOnInvalidNum(num);
        var winProbability = new bn_js_1.default(index_1.getNumSetBits(num) * index_1.PROBABILITY_DIVISOR)
            .divn(index_1.CHOOSE_FROM_12_NUMS)
            .toNumber();
        return utilities_1.maxBetFromProbability(winProbability, bankRoll);
    };
    ChooseFrom12.prototype.resultNumber = function (serverSeed, userSeed) {
        var randomNumber = utilities_1.generateRandomNumber(serverSeed, userSeed);
        return randomNumber.modn(index_1.CHOOSE_FROM_12_NUMS);
    };
    ChooseFrom12.prototype.userProfit = function (num, betValue, resultNum) {
        throwOnInvalidNum(num);
        var won = (num & (1 << resultNum)) > 0; // tslint:disable-line:no-bitwise
        if (won) {
            var totalWon = new bn_js_1.default(betValue)
                .muln(index_1.CHOOSE_FROM_12_NUMS)
                .divn(index_1.getNumSetBits(num));
            return utilities_1.profitFromTotalWon(totalWon, betValue);
        }
        else {
            return -betValue;
        }
    };
    ChooseFrom12.prototype.maxUserProfit = function (num, betValue) {
        var totalWon = new bn_js_1.default(betValue)
            .muln(index_1.CHOOSE_FROM_12_NUMS)
            .divn(index_1.getNumSetBits(num));
        return utilities_1.profitFromTotalWon(totalWon, betValue);
    };
    return ChooseFrom12;
}());
exports.default = ChooseFrom12;
//# sourceMappingURL=ChooseFrom12.js.map