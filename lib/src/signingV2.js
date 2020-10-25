"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var eip712_1 = require("@dicether/eip712");
var index_1 = require("./index");
var types = {
    EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
    ],
    Bet: [
        { name: "roundId", type: "uint32" },
        { name: "gameType", type: "uint8" },
        { name: "number", type: "uint256" },
        { name: "value", type: "uint256" },
        { name: "balance", type: "int256" },
        { name: "serverHash", type: "bytes32" },
        { name: "userHash", type: "bytes32" },
        { name: "gameId", type: "uint256" },
    ],
};
function createDomain(version, chainId, contractAddress) {
    return {
        name: "CheeseDice",
        version: version,
        chainId: chainId,
        verifyingContract: contractAddress,
    };
}
function convertBet(bet) {
    return __assign({}, bet, { userHash: bet.userHash, value: index_1.fromGweiToWei(bet.value).toString(), balance: index_1.fromGweiToWei(bet.balance).toString(), number: bet.num });
}
function createTypedDataV2(bet, version, chainId, contractAddress) {
    var domain = createDomain(version, chainId, contractAddress);
    return {
        types: types,
        primaryType: "Bet",
        domain: domain,
        message: convertBet(bet),
    };
}
exports.createTypedDataV2 = createTypedDataV2;
function signBetV2(bet, version, chainId, contractAddress, privateKey) {
    var data = createTypedDataV2(bet, version, chainId, contractAddress);
    return eip712_1.signTypedData(data, privateKey);
}
exports.signBetV2 = signBetV2;
function hashBetV2(bet, version, chainId, contractAddress) {
    var data = createTypedDataV2(bet, version, chainId, contractAddress);
    return eip712_1.hashTypedData(data);
}
exports.hashBetV2 = hashBetV2;
function recoverBetSignerV2(bet, version, chainId, contractAddress, signature) {
    var data = createTypedDataV2(bet, version, chainId, contractAddress);
    return eip712_1.recoverTypedData(data, signature);
}
exports.recoverBetSignerV2 = recoverBetSignerV2;
//# sourceMappingURL=signingV2.js.map