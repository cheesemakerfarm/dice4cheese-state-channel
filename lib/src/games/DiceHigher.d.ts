import { IGame } from "./IGame";
declare class DiceHigher implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string, betNum: number): number;
    userProfit(num: number, betValue: number, resultNum: number): number;
    maxUserProfit(num: number, betValue: number): number;
}
export default DiceHigher;
