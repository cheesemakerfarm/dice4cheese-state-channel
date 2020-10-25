import { Bet } from "./types";
export { Bet };
export * from "./games/Keno";
export * from "./games/Wheel";
export declare const RANGE = 100;
export declare const HOUSE_EDGE = 150;
export declare const HOUSE_EDGE_DIVISOR = 10000;
export declare const PROBABILITY_DIVISOR = 10000;
export declare const CHOOSE_FROM_12_NUMS = 12;
export declare enum GameStatus {
    ENDED = 0,
    ACTIVE = 1,
    USER_INITIATED_END = 2,
    SERVER_INITIATED_END = 3
}
export declare enum ReasonEnded {
    REGULAR_ENDED = 0,
    SERVER_FORCED_END = 1,
    USER_FORCED_END = 2,
    CONFLICT_ENDED = 3
}
export declare enum GameType {
    NO_GAME = 0,
    DICE_LOWER = 1,
    DICE_HIGHER = 2,
    CHOOSE_FROM_12 = 3,
    FLIP_A_COIN = 4,
    KENO = 5,
    WHEEL = 6
}
export declare function getSetBits(num: number): boolean[];
export declare function getNumSetBits(num: number): number;
export declare function fromWeiToGwei(value: string): number;
export declare function fromGweiToWei(value: number): string;
export declare function createHashChain(seed: string, len?: number): string[];
export declare function keccak(data: string): string;
export declare function verifySeed(seed: string, seedHashRef: string): boolean;
export declare function maxBet(gameType: number, num: number, bankRoll: number, k?: number): number;
export declare function calcResultNumber(gameType: number, serverSeed: string, userSeed: string, num: number): number;
export declare function calcUserProfit(gameType: number, num: number, betValue: number, resultNum: number): number;
export declare function calcMaxUserProfit(gameType: number, num: number, betValue: number): number;
export declare function calcNewBalance(gameType: number, num: number, betValue: number, serverSeed: string, userSeed: string, oldBalance: number): number;
export declare function createTypedData(bet: Bet, chainId: number, contractAddress: string, version?: number): ({
    type: string;
    name: string;
    value: number;
} | {
    type: string;
    name: string;
    value: string;
})[] | {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Bet: {
            name: string;
            type: string;
        }[];
    };
    primaryType: string;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    message: {
        userHash: string;
        value: string;
        balance: string;
        number: number;
        roundId: number;
        gameType: number;
        num: number;
        serverHash: string;
        gameId: number;
    };
};
export declare function hashBet(bet: Bet, chainId: number, contractAddress: string, version?: number): any;
export declare function signBet(bet: Bet, chainId: number, contractAddress: string, privateKey: Buffer, version?: number): any;
export declare function recoverBetSigner(bet: Bet, chainId: number, contractAddress: string, signature: string, version?: number): any;
export declare function verifySignature(bet: Bet, chainId: number, contractAddress: string, signature: string, address: string, version?: number): boolean;
export declare function signStartData(contractAddress: string, user: string, lastGameId: number, createBefore: number, serverEndHash: string, serverAccount: string, privateKey: Buffer): string;
