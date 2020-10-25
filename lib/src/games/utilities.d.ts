import BN from "bn.js";
export declare function maxBetFromProbability(winProbability: number, bankRoll: number): number;
export declare function generateRandomNumber(serverSeed: string, userSeed: string): BN;
export declare function profitFromTotalWon(totalWon: BN, betValue: number): number;
