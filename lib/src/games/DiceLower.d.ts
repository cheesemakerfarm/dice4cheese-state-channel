import { IGame } from "./IGame";
declare class DiceLower implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string): number;
    userProfit(num: number, betValue: number, resultNumber: number): number;
    maxUserProfit(num: number, betValue: number): number;
}
export default DiceLower;
