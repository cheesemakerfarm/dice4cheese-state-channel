"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var utilities_1 = require("./utilities");
exports.MAX_BET_DIVIDER = 10000;
exports.WHEEL_MAX_BET = {
    1: { 10: 632, 20: 386 },
    2: { 10: 134, 20: 134 },
    3: { 10: 17, 20: 8 },
};
exports.PAYOUT_DIVIDER = 100;
exports.WHEEL_PAYOUT = {
    1: {
        10: [0, 120, 120, 0, 120, 120, 145, 120, 120, 120],
        20: [0, 120, 120, 0, 120, 120, 145, 120, 0, 120, 240, 120, 0, 120, 120, 145, 120, 0, 120, 120],
    },
    2: {
        10: [0, 165, 0, 160, 0, 300, 0, 160, 0, 200],
        20: [0, 165, 0, 160, 0, 300, 0, 160, 0, 200, 0, 165, 0, 160, 0, 300, 0, 160, 0, 200],
    },
    3: {
        10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 985],
        20: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1970],
    },
};
exports.WHEEL_RESULT_RANGE = 600;
var Wheel = /** @class */ (function () {
    function Wheel() {
    }
    Wheel.prototype.maxBet = function (num, bankRoll) {
        Wheel.throwOnInvalidNum(num);
        var risk = Wheel.getRisk(num);
        var segments = Wheel.getSegments(num);
        var maxBet = exports.WHEEL_MAX_BET[risk][segments];
        return new bn_js_1.default(bankRoll)
            .muln(maxBet)
            .divn(exports.MAX_BET_DIVIDER)
            .toNumber();
    };
    Wheel.prototype.resultNumber = function (serverSeed, userSeed) {
        var randomNumber = utilities_1.generateRandomNumber(serverSeed, userSeed);
        return randomNumber.modn(exports.WHEEL_RESULT_RANGE);
    };
    Wheel.prototype.userProfit = function (num, betValue, resultNum) {
        Wheel.throwOnInvalidNum(num);
        Wheel.throwOnInvalidResultNum(resultNum);
        var risk = Wheel.getRisk(num);
        var segments = Wheel.getSegments(num);
        var result = new bn_js_1.default(resultNum)
            .muln(segments)
            .divn(exports.WHEEL_RESULT_RANGE)
            .toNumber();
        return new bn_js_1.default(betValue)
            .mul(new bn_js_1.default(exports.WHEEL_PAYOUT[risk][segments][result]))
            .divn(exports.PAYOUT_DIVIDER)
            .sub(new bn_js_1.default(betValue))
            .toNumber();
    };
    Wheel.prototype.maxUserProfit = function (num, betValue) {
        Wheel.throwOnInvalidNum(num);
        var risk = Wheel.getRisk(num);
        var segments = Wheel.getSegments(num);
        var maxPayout = exports.WHEEL_PAYOUT[risk][segments].reduce(function (a, b) { return Math.max(a, b); });
        return new bn_js_1.default(betValue)
            .mul(new bn_js_1.default(maxPayout))
            .divn(exports.PAYOUT_DIVIDER)
            .sub(new bn_js_1.default(betValue))
            .toNumber();
    };
    Wheel.getRisk = function (num) {
        return Math.floor(num / 100) % 10;
    };
    Wheel.getSegments = function (num) {
        return num % 100;
    };
    Wheel.throwOnInvalidNum = function (num) {
        var risk = this.getRisk(num);
        var segments = this.getSegments(num);
        if (risk < 1 || risk > 3 || segments > 20 || segments < 10 || segments % 10 !== 0) {
            throw new Error("Invalid number " + num);
        }
    };
    Wheel.throwOnInvalidResultNum = function (resultNum) {
        if (resultNum < 0 || resultNum >= exports.WHEEL_RESULT_RANGE) {
            throw new Error("Invalid number " + resultNum);
        }
    };
    return Wheel;
}());
exports.default = Wheel;
//# sourceMappingURL=Wheel.js.map