import { IGame } from "./IGame";
declare class FlipACoin implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string): number;
    userProfit(num: number, betValue: number, resultNumber: number): number;
    maxUserProfit(num: number, betValue: number): number;
}
export default FlipACoin;
