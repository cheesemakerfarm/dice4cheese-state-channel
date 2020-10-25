import { IGame } from "./IGame";
declare class ChooseFrom12 implements IGame {
    maxBet(num: number, bankRoll: number): number;
    resultNumber(serverSeed: string, userSeed: string): number;
    userProfit(num: number, betValue: number, resultNum: number): number;
    maxUserProfit(num: number, betValue: number): number;
}
export default ChooseFrom12;
