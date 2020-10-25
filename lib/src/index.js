"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
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
var ethAbi = __importStar(require("ethereumjs-abi"));
var ethUtil = __importStar(require("ethereumjs-util"));
var games_1 = require("./games");
var signingV1_1 = require("./signingV1");
var signingV2_1 = require("./signingV2");
__export(require("./games/Keno"));
__export(require("./games/Wheel"));
exports.RANGE = 100;
exports.HOUSE_EDGE = 150;
exports.HOUSE_EDGE_DIVISOR = 10000;
exports.PROBABILITY_DIVISOR = 10000;
exports.CHOOSE_FROM_12_NUMS = 12;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["ENDED"] = 0] = "ENDED";
    GameStatus[GameStatus["ACTIVE"] = 1] = "ACTIVE";
    GameStatus[GameStatus["USER_INITIATED_END"] = 2] = "USER_INITIATED_END";
    GameStatus[GameStatus["SERVER_INITIATED_END"] = 3] = "SERVER_INITIATED_END";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
var ReasonEnded;
(function (ReasonEnded) {
    ReasonEnded[ReasonEnded["REGULAR_ENDED"] = 0] = "REGULAR_ENDED";
    ReasonEnded[ReasonEnded["SERVER_FORCED_END"] = 1] = "SERVER_FORCED_END";
    ReasonEnded[ReasonEnded["USER_FORCED_END"] = 2] = "USER_FORCED_END";
    ReasonEnded[ReasonEnded["CONFLICT_ENDED"] = 3] = "CONFLICT_ENDED";
})(ReasonEnded = exports.ReasonEnded || (exports.ReasonEnded = {}));
var GameType;
(function (GameType) {
    GameType[GameType["NO_GAME"] = 0] = "NO_GAME";
    GameType[GameType["DICE_LOWER"] = 1] = "DICE_LOWER";
    GameType[GameType["DICE_HIGHER"] = 2] = "DICE_HIGHER";
    GameType[GameType["CHOOSE_FROM_12"] = 3] = "CHOOSE_FROM_12";
    GameType[GameType["FLIP_A_COIN"] = 4] = "FLIP_A_COIN";
    GameType[GameType["KENO"] = 5] = "KENO";
    GameType[GameType["WHEEL"] = 6] = "WHEEL";
})(GameType = exports.GameType || (exports.GameType = {}));
function getSetBits(num) {
    var result = [];
    for (var i = 0; i < 52; i++) {
        if (new bn_js_1.default(1)
            .shln(i)
            .and(new bn_js_1.default(num))
            .toNumber()) {
            result.push(true);
        }
        else {
            result.push(false);
        }
    }
    return result;
}
exports.getSetBits = getSetBits;
function getNumSetBits(num) {
    return getSetBits(num).filter(function (x) { return x === true; }).length;
}
exports.getNumSetBits = getNumSetBits;
function fromWeiToGwei(value) {
    return new bn_js_1.default(value).div(new bn_js_1.default(1e9)).toNumber();
}
exports.fromWeiToGwei = fromWeiToGwei;
function fromGweiToWei(value) {
    return new bn_js_1.default(value).mul(new bn_js_1.default(1e9)).toString();
}
exports.fromGweiToWei = fromGweiToWei;
function createHashChain(seed, len) {
    if (len === void 0) { len = 1000; }
    var result = [ethUtil.toBuffer(seed)];
    for (var i = 0; i < len; i++) {
        result.unshift(ethUtil.sha3(result[0]));
    }
    return result.map(function (val) { return ethUtil.bufferToHex(val); });
}
exports.createHashChain = createHashChain;
function keccak(data) {
    ethUtil.toBuffer(data);
    return ethUtil.bufferToHex(ethUtil.sha3(data));
}
exports.keccak = keccak;
function verifySeed(seed, seedHashRef) {
    var seedBuf = ethUtil.toBuffer(seed);
    var seedHashRefBuf = ethUtil.toBuffer(seedHashRef);
    var seedHashBuf = ethUtil.sha3(seedBuf);
    return seedHashRefBuf.equals(seedHashBuf);
}
exports.verifySeed = verifySeed;
function maxBet(gameType, num, bankRoll, k) {
    if (k === void 0) { k = 2; }
    var maxBetValue = games_1.getGameImplementation(gameType).maxBet(num, bankRoll);
    // round to 0.001 Ether
    return new bn_js_1.default(maxBetValue)
        .divn(k)
        .addn(5e5)
        .divn(1e6)
        .muln(1e6)
        .toNumber();
}
exports.maxBet = maxBet;
function calcResultNumber(gameType, serverSeed, userSeed, num) {
    return games_1.getGameImplementation(gameType).resultNumber(serverSeed, userSeed, num);
}
exports.calcResultNumber = calcResultNumber;
function calcUserProfit(gameType, num, betValue, resultNum) {
    return games_1.getGameImplementation(gameType).userProfit(num, betValue, resultNum);
}
exports.calcUserProfit = calcUserProfit;
function calcMaxUserProfit(gameType, num, betValue) {
    return games_1.getGameImplementation(gameType).maxUserProfit(num, betValue);
}
exports.calcMaxUserProfit = calcMaxUserProfit;
function calcNewBalance(gameType, num, betValue, serverSeed, userSeed, oldBalance) {
    var resultNum = calcResultNumber(gameType, serverSeed, userSeed, num);
    var profit = calcUserProfit(gameType, num, betValue, resultNum);
    return profit + oldBalance;
}
exports.calcNewBalance = calcNewBalance;
function createTypedData(bet, chainId, contractAddress, version) {
    if (version === void 0) { version = 2; }
    switch (version) {
        case 1:
            return signingV1_1.createTypedDataV1(bet, contractAddress);
        case 2:
            return signingV2_1.createTypedDataV2(bet, "2", chainId, contractAddress);
        default:
            throw new Error("Invalid signature version!");
    }
}
exports.createTypedData = createTypedData;
function hashBet(bet, chainId, contractAddress, version) {
    if (version === void 0) { version = 2; }
    switch (version) {
        case 1:
            return signingV1_1.hashBetV1(bet, contractAddress);
        case 2:
            return signingV2_1.hashBetV2(bet, "2", chainId, contractAddress);
        default:
            throw new Error("Invalid signature version!");
    }
}
exports.hashBet = hashBet;
function signBet(bet, chainId, contractAddress, privateKey, version) {
    if (version === void 0) { version = 2; }
    switch (version) {
        case 1:
            return signingV1_1.signBetV1(bet, contractAddress, privateKey);
        case 2:
            return signingV2_1.signBetV2(bet, "2", chainId, contractAddress, privateKey);
        default:
            throw new Error("Invalid signature version!");
    }
}
exports.signBet = signBet;
function recoverBetSigner(bet, chainId, contractAddress, signature, version) {
    if (version === void 0) { version = 2; }
    switch (version) {
        case 1:
            return signingV1_1.recoverBetSignerV1(bet, contractAddress, signature);
        case 2:
            return signingV2_1.recoverBetSignerV2(bet, "2", chainId, contractAddress, signature);
        default:
            throw new Error("Invalid signature version!");
    }
}
exports.recoverBetSigner = recoverBetSigner;
function verifySignature(bet, chainId, contractAddress, signature, address, version) {
    if (version === void 0) { version = 2; }
    return recoverBetSigner(bet, chainId, contractAddress, signature, version) === address;
}
exports.verifySignature = verifySignature;
function signStartData(contractAddress, user, lastGameId, createBefore, serverEndHash, serverAccount, privateKey) {
    var hash = ethAbi.soliditySHA3(["address", "address", "uint256", "uint256", "bytes32"], [contractAddress, user, lastGameId, createBefore, ethUtil.toBuffer(serverEndHash)]);
    var sig = ethUtil.ecsign(hash, privateKey);
    return ethUtil.toRpcSig(sig.v, sig.r, sig.s);
}
exports.signStartData = signStartData;
//# sourceMappingURL=index.js.map