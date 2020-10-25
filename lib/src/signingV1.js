"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eip712_1 = require("@dicether/eip712");
var index_1 = require("./index");
function createTypedDataV1(bet, contractAddress) {
    return [
        {
            type: "uint32",
            name: "Round Id",
            value: bet.roundId,
        },
        {
            type: "uint8",
            name: "Game Type",
            value: bet.gameType,
        },
        {
            type: "uint16",
            name: "Number",
            value: bet.num,
        },
        {
            type: "uint",
            name: "Value (Wei)",
            value: index_1.fromGweiToWei(bet.value),
        },
        {
            type: "int",
            name: "Current Balance (Wei)",
            value: index_1.fromGweiToWei(bet.balance),
        },
        {
            type: "bytes32",
            name: "Server Hash",
            value: bet.serverHash,
        },
        {
            type: "bytes32",
            name: "Player Hash",
            value: bet.userHash,
        },
        {
            type: "uint",
            name: "Game Id",
            value: bet.gameId,
        },
        {
            type: "address",
            name: "Contract Address",
            value: contractAddress,
        },
    ];
}
exports.createTypedDataV1 = createTypedDataV1;
function signBetV1(bet, contractAddress, privateKey) {
    var typedData = createTypedDataV1(bet, contractAddress);
    return eip712_1.signTypedDataLegacy(typedData, privateKey);
}
exports.signBetV1 = signBetV1;
function hashBetV1(bet, contractAddress) {
    var typedData = createTypedDataV1(bet, contractAddress);
    return eip712_1.hashTypedDataLegacy(typedData);
}
exports.hashBetV1 = hashBetV1;
function recoverBetSignerV1(bet, contractAddress, signature) {
    var typedData = createTypedDataV1(bet, contractAddress);
    return eip712_1.recoverTypedDataLegacy(typedData, signature);
}
exports.recoverBetSignerV1 = recoverBetSignerV1;
//# sourceMappingURL=signingV1.js.map