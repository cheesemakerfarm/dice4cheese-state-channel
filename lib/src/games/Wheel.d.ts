import { IGame } from "./IGame";
export declare const MAX_BET_DIVIDER = 10000;
export declare const WHEEL_MAX_BET: {
    [key: number]: {
        [key: number]: number;
    };
};
export declare const PAYOUT_DIVIDER = 100;
export declare const WHEEL_PAYOUT: {
    [key: number]: {
        [key: number]: number[];
    };
};
export declare const WHEEL_RESULT_RANGE = 600;
declare class Wheel implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string): number;
    userProfit(num: number, betValue: number, resultNum: number): number;
    maxUserProfit(num: number, betValue: number): number;
    private static getRisk;
    private static getSegments;
    private static throwOnInvalidNum;
    private static throwOnInvalidResultNum;
}
export default Wheel;
