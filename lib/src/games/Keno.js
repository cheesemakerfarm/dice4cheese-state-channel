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
exports.KENO_DIVIDER = 1000;
exports.KENO_MAX_BET = [0, 5, 10, 7, 5, 4, 4, 2, 2, 2, 1];
exports.KENO_PAY_OUT = [
    [0],
    [0, 3940],
    [0, 2000, 3740],
    [0, 1000, 3150, 9400],
    [0, 800, 1700, 5300, 24500],
    [0, 250, 1400, 4000, 16600, 42000],
    [0, 0, 1000, 3650, 7000, 16000, 46000],
    [0, 0, 460, 3000, 4400, 14000, 39000, 80000],
    [0, 0, 0, 2250, 4000, 11000, 30000, 67000, 90000],
    [0, 0, 0, 1550, 3000, 8000, 14000, 37000, 65000, 100000],
    [0, 0, 0, 1400, 2200, 4400, 8000, 28000, 60000, 120000, 200000],
];
exports.KENO_SELECTABLE_FIELDS = 10;
exports.KENO_FIELDS = 40;
var Keno = /** @class */ (function () {
    function Keno() {
    }
    Keno.prototype.maxBet = function (num, bankRoll) {
        Keno.throwOnInvalidNum(num);
        var fields = index_1.getNumSetBits(num);
        return new bn_js_1.default(exports.KENO_MAX_BET[fields])
            .mul(new bn_js_1.default(bankRoll))
            .divn(exports.KENO_DIVIDER)
            .toNumber();
    };
    Keno.prototype.resultNumber = function (serverSeed, userSeed) {
        var resultNum = new bn_js_1.default(0);
        var serverSeedBuf = ethUtil.toBuffer(serverSeed);
        var userSeedBuf = ethUtil.toBuffer(userSeed);
        var seed = ethUtil.sha3(Buffer.concat([serverSeedBuf, userSeedBuf]));
        for (var i = 0; i < exports.KENO_SELECTABLE_FIELDS; i++) {
            var hexSeed = seed.toString("hex");
            var randNum = new bn_js_1.default(hexSeed, 16).modn(exports.KENO_FIELDS - i);
            var resultPos = 0;
            var pos = 0;
            for (;;) {
                if (resultNum.and(new bn_js_1.default(1).shln(resultPos)).toNumber() === 0) {
                    if (pos === randNum) {
                        break;
                    }
                    pos += 1;
                }
                resultPos += 1;
            }
            resultNum.ior(new bn_js_1.default(1).shln(resultPos));
            // update seed
            seed = ethUtil.sha3(seed);
        }
        return resultNum.toNumber();
    };
    Keno.prototype.userProfit = function (num, betValue, resultNum) {
        Keno.throwOnInvalidNum(num);
        Keno.throwOnInvalidResultNum(resultNum);
        var hits = index_1.getNumSetBits(new bn_js_1.default(num).and(new bn_js_1.default(resultNum)).toNumber());
        var selected = index_1.getNumSetBits(num);
        return Keno.calcProfit(betValue, selected, hits);
    };
    Keno.prototype.maxUserProfit = function (num, betValue) {
        Keno.throwOnInvalidNum(num);
        var selected = index_1.getNumSetBits(num);
        return Keno.calcProfit(betValue, selected, selected);
    };
    Keno.calcProfit = function (betValue, selected, hits) {
        var payOutMultiplier = exports.KENO_PAY_OUT[selected][hits];
        var payout = new bn_js_1.default(betValue).muln(payOutMultiplier).divn(exports.KENO_DIVIDER);
        return payout.sub(new bn_js_1.default(betValue)).toNumber();
    };
    Keno.throwOnInvalidNum = function (num) {
        var numSetBits = index_1.getNumSetBits(num);
        if (num <= 0 || num >= Math.pow(2, exports.KENO_FIELDS) || numSetBits < 1 || numSetBits > exports.KENO_SELECTABLE_FIELDS) {
            throw new Error("Invalid number " + num);
        }
    };
    Keno.throwOnInvalidResultNum = function (resultNum) {
        var numSetBits = index_1.getNumSetBits(resultNum);
        if (resultNum <= 0 || resultNum >= Math.pow(2, exports.KENO_FIELDS) || numSetBits !== exports.KENO_SELECTABLE_FIELDS) {
            throw new Error("Invalid number " + resultNum);
        }
    };
    return Keno;
}());
exports.default = Keno;
//# sourceMappingURL=Keno.js.map