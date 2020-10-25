"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ethereumjs_util_1 = require("ethereumjs-util");
var src_1 = require("../src");
describe("hashBetV2", function () {
    it("test 1", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: 0,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var hash = src_1.hashBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", 2);
        chai_1.expect(hash).to.deep.equal(ethereumjs_util_1.toBuffer("0x9bb213c565dd498f7f88b46c352aab54484e399856bb33dc00ec83dfa4d8748b"));
    });
    it("test 2", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: -1,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var hash = src_1.hashBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", 2);
        chai_1.expect(hash).to.deep.equal(ethereumjs_util_1.toBuffer("0xa68fa492829b6c4ff3b831b9c1500632ce2316b5c852812603a1b4a2edd50cd6"));
    });
});
describe("signBetV2", function () {
    it("sign and recover", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: 0,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var address = "0x29C76e6aD8f28BB1004902578Fb108c507Be341b";
        var privKeyHex = "0x4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0";
        var privKey = ethereumjs_util_1.toBuffer(privKeyHex);
        var refSig = "0xae9fe52346181191d857a137d60cd075f654d2e1b4b88b7df55f28c308809de0314" +
            "edc28683175daefd1a633fca66a67e4349e7fa57c6f3b721f3cee3d0c3a111c";
        var sig = src_1.signBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", privKey, 2);
        var addressRec = src_1.recoverBetSigner(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", sig);
        chai_1.expect(sig).to.equal(refSig);
        chai_1.expect(addressRec).to.equal(address);
    });
});
describe("hashBetV1", function () {
    it("test 1", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: 0,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var hash = src_1.hashBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", 1);
        chai_1.expect(hash).to.deep.equal(ethereumjs_util_1.toBuffer("0xbd0816cd7d29d91ef5ae4bcedd252327d278956fb73a1f325351544d633827a7"));
    });
    it("test 2", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: -1,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var hash = src_1.hashBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", 1);
        chai_1.expect(hash).to.deep.equal(ethereumjs_util_1.toBuffer("0x0847337d0850582dd4b05a613ea3b1db71cadcbd0f479c2720d3fa104d509017"));
    });
});
describe("signBetV1", function () {
    it("sign and recover", function () {
        var bet = {
            roundId: 1,
            gameType: 1,
            num: 10,
            value: 10000000,
            balance: 0,
            serverHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            userHash: "0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2",
            gameId: 40,
        };
        var address = "0x29C76e6aD8f28BB1004902578Fb108c507Be341b";
        var privKeyHex = "0x4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0";
        var privKey = ethereumjs_util_1.toBuffer(privKeyHex);
        var refSig = "0x9e9af3a48c6fe0704c390958abd7353367a13184760878ead2afd4962a5a8c83766" +
            "33790a3011897283c5fc68df098cc25de034be8e8dd744ccc8118050be19c1b";
        var sig = src_1.signBet(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", privKey, 1);
        var addressRec = src_1.recoverBetSigner(bet, 123456789, "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB", sig, 1);
        chai_1.expect(sig).to.equal(refSig);
        chai_1.expect(addressRec).to.equal(address);
    });
});
//# sourceMappingURL=index.js.map