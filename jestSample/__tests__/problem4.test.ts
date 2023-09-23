import { RockPaperScissors, calculateWalkingTimeInMinutes, showResultBloodTypeTest } from "../problem4";
import { MockFailedFetchResultBloodTypeApi, MockSuccessFetchResultBloodTypeApi } from "../problem4Api";
import { MockEnemy } from "../rockPaperScissorsEnemy";

describe('# calculationWakingTimeInMinute \n', () => {
  test('- distanceInMetersが-1未満の場合、Error\'0より大きい数値を入力してください。\'がスローされる \n', () => {
    // 準備 実行 確認
    expect(() => calculateWalkingTimeInMinutes(-1.1)).toThrow(Error('0より大きい数値を入力してください。'));
  })

  test('- distanceInMetersが0以上、10未満の場合、1の位を繰上げない計算結果が返ってくる \n', () => {
    // 準備 実行
    let result = calculateWalkingTimeInMinutes(720);
    // 確認
    expect(result).toBe(9);
  })

  test('- distanceInMetersが10以上の場合、1の位を繰上げた計算結果が返ってくる \n', () => {
    // 準備 実行
    let result = calculateWalkingTimeInMinutes(900);
    // 確認
    expect(result).toBe(15);
  })
})

describe('# showResultBloodTypeTest \n', () => {
  test('## 血液型ID以外の数字を渡した場合、Stringで"診断結果が取得できませんでした。"が返ってくる \n', async () => {
      // 準備 
      let mockAPI = new MockFailedFetchResultBloodTypeApi();
      // 実行
      let result = await showResultBloodTypeTest(999, mockAPI);
      // 確認
      expect(result).toBe('診断結果が取得できませんでした。');
  })

  test('## 血液型IDを渡した場合、Stringで性格診断の結果が返ってくる \n', async () => {
      // 準備 
      let mockAPI = new MockSuccessFetchResultBloodTypeApi();
      // 実行
      let result = await showResultBloodTypeTest(1, mockAPI);
      // 確認
      expect(result).toBe('少しおおざっぱな性格です。');
  })
})

describe('# play \n', () => {
  test('- 不正な値を渡した場合、Error"入力に誤りがあります！"がスローされる \n', () => {
    // 準備
    let rockPaperScissors = new RockPaperScissors();
    // 実行 確認
    expect(() => rockPaperScissors.play('グー')).toThrow(Error("入力に誤りがあります！"));
  })

  describe('## 正しい値を入力した場合、じゃんけんの結果が返ってくる \n', () => {
    describe('### じゃんけんに勝った場合、"あなたの勝ちです"が返ってくる \n', () => {
      test.each`
      my            | enemy
      ${"rock"}     | ${"scissors"}  
      ${"paper"}    | ${"rock"}  
      ${"scissors"} | ${"paper"}
      `("- 自分が$my、敵が$enemy \n", ({my, enemy}) => {
        // 準備
        let mockEnemy = new MockEnemy(enemy);
        let rockPaperScissors = new RockPaperScissors(mockEnemy);
        // 実行
        let result = rockPaperScissors.play(my);
        // 確認
        expect(result).toBe("あなたの勝ちです");
      })
    })
    describe('### じゃんけんに負けた場合、"あなたの負けです"が返ってくる \n', () => {
      test.each`
      my            | enemy
      ${"rock"}     | ${"paper"}  
      ${"paper"}    | ${"scissors"}  
      ${"scissors"} | ${"rock"}
      `("- 自分が$my、敵が$enemy \n", ({my, enemy}) => {
        // 準備
        let mockEnemy = new MockEnemy(enemy);
        let rockPaperScissors = new RockPaperScissors(mockEnemy);
        // 実行
        let result = rockPaperScissors.play(my);
        // 確認
        expect(result).toBe("あなたの負けです");
      })
    })
    describe('### じゃんけんがあいこだった場合、"あいこです"が返ってくる \n', () => {
      test.each`
      my            | enemy
      ${"rock"}     | ${"rock"}  
      ${"paper"}    | ${"paper"}  
      ${"scissors"} | ${"scissors"}
      `("- 自分が$my、敵が$enemy \n", ({my, enemy}) => {
        // 準備
        let mockEnemy = new MockEnemy(enemy);
        let rockPaperScissors = new RockPaperScissors(mockEnemy);
        // 実行
        let result = rockPaperScissors.play(my);
        // 確認
        expect(result).toBe("あいこです");
      })
    })
  })
})