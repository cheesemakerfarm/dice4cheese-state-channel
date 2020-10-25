import { IGame } from "./IGame";
export declare const KENO_DIVIDER = 1000;
export declare const KENO_MAX_BET: number[];
export declare const KENO_PAY_OUT: number[][];
export declare const KENO_SELECTABLE_FIELDS = 10;
export declare const KENO_FIELDS = 40;
declare class Keno implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string): number;
    userProfit(num: number, betValue: number, resultNum: number): number;
    maxUserProfit(num: number, betValue: number): number;
    private static calcProfit;
    private static throwOnInvalidNum;
    private static throwOnInvalidResultNum;
}
export default Keno;
