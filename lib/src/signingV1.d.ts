import { Bet } from "./types";
export declare function createTypedDataV1(bet: Bet, contractAddress: string): ({
    type: string;
    name: string;
    value: number;
} | {
    type: string;
    name: string;
    value: string;
})[];
export declare function signBetV1(bet: Bet, contractAddress: string, privateKey: Buffer): any;
export declare function hashBetV1(bet: Bet, contractAddress: string): any;
export declare function recoverBetSignerV1(bet: Bet, contractAddress: string, signature: string): string;
