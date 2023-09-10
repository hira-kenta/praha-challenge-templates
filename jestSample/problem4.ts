import { BloodTypeTest, FetchResultBloodTypeApi, IFetchResultBloodTypeApi } from "./problem4Api";

// (1)徒歩約何分以内かを計算する関数。
// 　10分より時間がかかる場合、近い5の倍数に切り上げる。（11分→15分、26分→30分）
export const calculateWalkingTimeInMinutes = (distanceInMeters: number): number => {
    const walkingSpeed: number = 80;
    if(distanceInMeters <= 0) throw new Error("0より大きい数値を入力してください。");   
    let walkingTime: number = Math.ceil(distanceInMeters / walkingSpeed);
    if(walkingTime > 10){
        walkingTime = Math.ceil(walkingTime / 5) * 5;
    }
    return walkingTime;
}

// (2)血液型性格診断（選択した血液型に応じて性格診断結果を返す）
// 画面上にセレクトボックスのようなものが存在しており、各血液型に対してIDが振られているイメージ。
// 血液型選択時にIDがパラメータとして渡される。
// 血液型：ID → [ A型：1, B型：2, AB型：3, O型：4 ] 
// 以下のURLにアクセスしたら返却されるJSONが確認できます。
// https://my-json-server.typicode.com/hira-kenta/bloodTypeTestApi/bloodTypeTests/
export const showResultBloodTypeTest = async (bloodTypeId: number, apiFetcher: IFetchResultBloodTypeApi): Promise<string> => {
    const fetchData: BloodTypeTest = await apiFetcher.getResultBloodTypeTest(bloodTypeId);
    const result: string = fetchData.text ?? "診断結果が取得できませんでした。";
    return result;
};

// (3)じゃんけん
// rock、paper、scissorsのどれかをplay()に渡すことでじゃんけんができます。
// 上記以外の入力を受け付けた場合、例外がthrowされます。
export class RockPaperScissors{
    private readonly HANDS: string[] = ["rock", "paper", "scissored"]; 
    private enemy: IEnemy;
    constructor(enemy?: IEnemy) {
        this.enemy = enemy || new Enemy();
    }
    
    public play(hand: string): string{
        if(!this.HANDS.includes(hand)) throw Error("入力に誤りがあります！");
        const handOfEnemy: string = this.enemy.getRandomHand();

        if(hand == handOfEnemy) return Result.DRAW;

        if(hand == "rock"){
            return handOfEnemy == "scissors" ? Result.WIN : Result.LOSE;
        }

        if(hand == "paper"){
            return handOfEnemy == "rock" ? Result.WIN : Result.LOSE;
        }

        return handOfEnemy == "paper" ? Result.WIN : Result.LOSE;
    }
};

const Result= {
    WIN: "あなたの勝ちです",
    LOSE: "あなたの負けです",
    DRAW: "あいこです"
} as const;

interface IEnemy {
    getRandomHand(): string;
}

// あいて（グーチョキパーをランダムで出してくれます）
class Enemy implements IEnemy {
    public getRandomHand(): string{
        const hands = ["rock", "paper", "scissors"];
        const index = Math.floor(Math.random() * hands.length);
        return hands[index];
    }
};

// Mock class
export class MockEnemy implements IEnemy {
    private hand: string;

    constructor(hand: string) {
        this.hand = hand;
    }

    public getRandomHand(): string {
        return this.hand;
    }
}