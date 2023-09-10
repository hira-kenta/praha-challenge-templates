import axios from "axios";
import {
  calculateWalkingTimeInMinutes,
  showResultBloodTypeTest,
  RockPaperScissors,
  Result,
  Enemy,
} from "../problem4";
import type { BloodTypeTest } from "../problem4Api";
describe("calculateWalkingTimeInMinutesのテスト", () => {
  test("0以下の数値の時は「0より大きい数値を入力してください。」エラー", async () => {
    // SetUp
    const distanceInMeters = -4;
    // Exercise
    const actual = () => calculateWalkingTimeInMinutes(distanceInMeters);
    // Verify
    expect(actual).toThrow("0より大きい数値を入力してください。");
  });
});
describe("calculateWalkingTimeInMinutesのテスト", () => {
  const distance1min = 80; //徒歩1分の距離

  test("徒歩10分以下の数値の時はそのまま返される", async () => {
    // SetUp
    const walkingTime = 8; //8分
    const distanceInMeters = distance1min * walkingTime;
    const walkingTimeExpect = 8; //8分
    // Exercise
    const actual = calculateWalkingTimeInMinutes(distanceInMeters);
    // Verify
    expect(actual).toBe(walkingTimeExpect);
  });
  test("徒歩10分以上は5の倍数に切り上げられる。徒歩12分は15分に。", async () => {
    // SetUp
    const walkingTime = 12; //12分
    const distanceInMeters = distance1min * walkingTime;
    const walkingTimeExpect = 15;
    // Exercise
    const actual = calculateWalkingTimeInMinutes(distanceInMeters);
    // Verify
    expect(actual).toBe(walkingTimeExpect);
  });
  test("徒歩10分以上は5の倍数に切り上げられる。徒歩27分は30分に。", async () => {
    // SetUp
    const walkingTime = 27; //27分
    const distanceInMeters = distance1min * walkingTime;
    const walkingTimeExpect = 30;
    // Exercise
    const actual = calculateWalkingTimeInMinutes(distanceInMeters);
    // Verify
    expect(actual).toBe(walkingTimeExpect);
  });
});

describe("showResultBloodTypeTestのテスト", () => {
  const mockData: BloodTypeTest = {
    id: 1,
    bloodTypeId: 1,
    text: "少しおおざっぱな性格です。",
  };

  beforeEach((): void => {
    jest.mock("axios");
  });
  afterEach((): void => {
    jest.restoreAllMocks();
  });
  test("1～4を選択した時は「性格診断結果」が返される。", async () => {
    // SetUp
    // axiosをスパイ。Mockを返すように
    const axioxGetSuccessSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(async () => ({
        data: mockData,
      }));
    const expectText = mockData.text;
    // Exercise
    [1, 2, 3, 4].map((bloodId) => {
      const actual = showResultBloodTypeTest(bloodId);
      // Verify
      expect(actual).resolves.toBe(expectText);
    });
    // TearDown
    axioxGetSuccessSpy.mockRestore();
  });
  test("apiが失敗した時は「診断結果が取得できませんでした。」が返される。", async () => {
    // SetUp
    // axiosでエラーを返すmock
    const axioxFailureSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(
        (): Promise<BloodTypeTest> => new Promise((_, reject) => reject({}))
      );

    const expectText = "診断結果が取得できませんでした。";
    // Exercise
    const actual = showResultBloodTypeTest(1);
    // Verify
    expect(actual).resolves.toBe(expectText);
    // TearDown
    axioxFailureSpy.mockRestore();
  });
});
describe("RockPaperScissorsのテスト：相手がグーの時のテスト", () => {
  let mockOnlyRockHand: jest.Mock;
  let janken: RockPaperScissors;

  beforeEach(() => {
    janken = new RockPaperScissors();
    mockOnlyRockHand = jest.fn();
    Enemy.prototype.getRandomHand = mockOnlyRockHand; //prototype使えばクラスの中のメンバ関数も置き換えられる。すげー。
    mockOnlyRockHand.mockReturnValue("rock");
  });

  afterEach(() => {
    mockOnlyRockHand.mockRestore();
  });
  test("自分がグーを出した時はあいこ", async () => {
    // SetUp
    const expectResult = Result.DRAW;
    // Exercise
    const actual = janken.play("rock");
    // Verify
    expect(actual).toBe(expectResult);
  });
  test("自分がパーを出した時は勝ち", async () => {
    // SetUp
    const expectResult = Result.WIN;
    // Exercise
    const actual = janken.play("paper");
    // Verify
    expect(actual).toBe(expectResult);
  });

  test("自分がチョキを出した時は負け", async () => {
    // SetUp
    const expectResult = Result.LOSE;
    // Exercise
    const actual = janken.play("scissors");
    // Verify
    expect(actual).toBe(expectResult);
  });
});
describe("RockPaperScissorsのテスト：相手がパーの時のテスト", () => {
  let mockOnlyPaperHand: jest.Mock;
  let janken: RockPaperScissors;

  beforeEach(() => {
    janken = new RockPaperScissors();
    mockOnlyPaperHand = jest.fn();
    Enemy.prototype.getRandomHand = mockOnlyPaperHand; //prototype使えばクラスの中のメンバ関数も置き換えられる。すげー。
    mockOnlyPaperHand.mockReturnValue("paper");
  });

  afterEach(() => {
    mockOnlyPaperHand.mockRestore();
  });
  test("自分がパーを出した時はあいこ", async () => {
    // SetUp
    const expectResult = Result.DRAW;
    // Exercise
    const actual = janken.play("paper");
    // Verify
    expect(actual).toBe(expectResult);
  });
  test("自分がチョキを出した時は勝ち", async () => {
    // SetUp
    const expectResult = Result.WIN;
    // Exercise
    const actual = janken.play("scissors");
    // Verify
    expect(actual).toBe(expectResult);
  });

  test("自分がグーを出した時は負け", async () => {
    // SetUp
    const expectResult = Result.LOSE;
    // Exercise
    const actual = janken.play("rock");
    // Verify
    expect(actual).toBe(expectResult);
  });
});
describe("RockPaperScissorsのテスト：相手がチョキの時のテスト", () => {
  let mockOnlyScissorsHand: jest.Mock;
  let janken: RockPaperScissors;

  beforeEach(() => {
    janken = new RockPaperScissors();
    mockOnlyScissorsHand = jest.fn();
    Enemy.prototype.getRandomHand = mockOnlyScissorsHand;
    mockOnlyScissorsHand.mockReturnValue("scissors");
  });

  afterEach(() => {
    mockOnlyScissorsHand.mockRestore();
  });
  test("自分がチョキを出した時はあいこ", async () => {
    // SetUp
    const expectResult = Result.DRAW;
    // Exercise
    const actual = janken.play("scissors");
    // Verify
    expect(actual).toBe(expectResult);
  });
  test("自分がグーを出した時は勝ち", async () => {
    // SetUp
    const expectResult = Result.WIN;
    // Exercise
    const actual = janken.play("rock");
    // Verify
    expect(actual).toBe(expectResult);
  });

  test("自分がパーを出した時は負け", async () => {
    // SetUp
    const expectResult = Result.LOSE;
    // Exercise
    const actual = janken.play("paper");
    // Verify
    expect(actual).toBe(expectResult);
  });
});
describe("RockPaperScissorsのテスト：3手以外を出した時", () => {
  test("rock, paper, scissors以外を出すとエラー", async () => {
    // SetUp
    const expectErrorMessage = "入力に誤りがあります！";
    // Exercise
    const actual = () => new RockPaperScissors().play("addleold");
    // Verify
    expect(actual).toThrow(expectErrorMessage);
  });
});
