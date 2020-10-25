import { Bet } from "./types";
export declare function createTypedDataV2(bet: Bet, version: string, chainId: number, contractAddress: string): {
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
export declare function signBetV2(bet: Bet, version: string, chainId: number, contractAddress: string, privateKey: Buffer): any;
export declare function hashBetV2(bet: Bet, version: string, chainId: number, contractAddress: string): any;
export declare function recoverBetSignerV2(bet: Bet, version: string, chainId: number, contractAddress: string, signature: string): any;
