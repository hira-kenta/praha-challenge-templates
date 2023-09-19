import { Enemy, IEnemy, MockEnemyChoisePaper, MockEnemyChoiseRock, MockEnemyChoiseScissors, RockPaperScissors, calculateWalkingTimeInMinutes, showResultBloodTypeTest } from "../problem4";
import { IFetchResultBloodTypeApi, MockFetchResultBloodTypeApi } from "../problem4Api";

// (1) のテスト
describe("calculateWalkingTimeInMinutes", () => {
    // Parameterized test で実装
    test.each`
         meter | expected | detail
        ${800} | ${10}    | ${"(割り切れる)"}
        ${400} | ${5}     | ${"(割り切れるかつ10未満)"}
        ${1600}| ${20}    | ${"(割り切れるかつ10より大きい)"}
        ${700} | ${9}     | ${"(小数かつ10未満)"}
        ${1100}| ${15}    | ${"(小数かつ10以上)"}
        ${50}  | ${1}     | ${"(少数かつ1未満)"}
    `("入力値が $meter の場合、$expected が返却される $detail", ({meter, expected}) => {
        // Act
        const actual: number = calculateWalkingTimeInMinutes(meter);
        // Assert
        expect(actual).toBe(expected);
    });

    test("入力値が0の場合、例外がthrowされる", () => {
        // Arrange
        const param: number = 0;
        // Act,Assert
        expect(() => calculateWalkingTimeInMinutes(param)).toThrowError("0より大きい数値を入力してください。");
    });

    test("入力値が0未満の場合、例外がthrowされる", () => {
        // Arrange
        const param: number = -800;
        // Act,Assert
        expect(() => calculateWalkingTimeInMinutes(param)).toThrowError("0より大きい数値を入力してください。");
    });
});

// (2) のテスト
describe("showResultBloodTypeTest", () => {
    test.each`
    bloodTypeId | bloodType | expected 
        ${1}    | ${"A型"}  | ${"少しおおざっぱな性格です。"}    
        ${2}    | ${"B型"}  | ${"比較的おおざっぱな性格かもしれません。"}     
        ${3}    | ${"AB型"} | ${"おおざっぱなときとそうでないときがある性格かもしれません。"}    
        ${4}    | ${"O型"}  | ${"おおざっぱな性格です。"}     
        ${5}    | ${"異常値"}| ${"診断結果が取得できませんでした。"}    
   `("入力値が $bloodTypeId ($bloodType) の場合、$expected が返却される", async ({bloodTypeId, expected})=> {
        // Arrange
        const param: number = bloodTypeId;
        const fetchResultBloodTypeApi: IFetchResultBloodTypeApi = new MockFetchResultBloodTypeApi;
        // Act
        const actual: string = await showResultBloodTypeTest(param, fetchResultBloodTypeApi);
        // Assert
        expect(actual).toBe(expected);
   })
});

// (3)のテスト
describe("RockPaperScissors", () => {
    const enemyChoiseRock: IEnemy = new MockEnemyChoiseRock;
    const enemyChoiseScissors: IEnemy = new MockEnemyChoiseScissors;
    const enemyChoisePaper: IEnemy = new MockEnemyChoisePaper;
    const enemyHandIsRock: RockPaperScissors = new RockPaperScissors(enemyChoiseRock);
    const enemyHandIsScissors: RockPaperScissors = new RockPaperScissors(enemyChoiseScissors);
    const enemyHandIsPaper: RockPaperScissors = new RockPaperScissors(enemyChoisePaper);
    
    describe('Enemyがグーを出す場合', () => {
        test.each`
        myHand       | expected
       ${"paper"}    | ${"あなたの勝ちです"}
       ${"scissors"} | ${"あなたの負けです"}
       ${"rock"}     | ${"あいこです"}
       `("自分の手が $myHand の場合、$expected が返却される ", ({myHand, expected}) => {
            // Act
            const actual: string = enemyHandIsRock.play(myHand);
            // Assert
            expect(actual).toBe(expected);
        });
    })

    describe('Enemyがチョキを出す場合', () => {
        test.each`
         myHand       | expected
        ${"rock"}     | ${"あなたの勝ちです"}
        ${"paper"}    | ${"あなたの負けです"}
        ${"scissors"} | ${"あいこです"}
        `("自分の手が $myHand の場合、$expected が返却される ", ({myHand, expected}) => {
            // Act
            const actual: string = enemyHandIsScissors.play(myHand);
            // Assert
            expect(actual).toBe(expected);
        });
    })

    describe('Enemyがパーを出す場合', () => {
        test.each`
         myHand       | expected
        ${"scissors"} | ${"あなたの勝ちです"}
        ${"rock"}     | ${"あなたの負けです"}
        ${"paper"}    | ${"あいこです"}
        `("自分の手が $myHand の場合、$expected が返却される ", ({myHand, expected}) => {
            // Act
            const actual: string = enemyHandIsPaper.play(myHand);
            // Assert
            expect(actual).toBe(expected);
        });
    })

    test("「rock」か「paper」か「scissors」以外の文字列を入力した場合、例外がthrowされる", () => {
        // Arrange
        const enemy: IEnemy = new Enemy;
        const rockPaperScissors: RockPaperScissors = new RockPaperScissors(enemy);
        // Act, Assert
        expect(() => rockPaperScissors.play("invalid")).toThrowError("入力に誤りがあります！");
    })

    describe('Enemy', () => {
        // 乱数のテストになっていたため、Math.random()をモック化してテストするように修正
        // test('「rock」か「paper」か「scissors」が返却される', () => {
        //     const enemy = new Enemy();
        //     const possibleHands = ["rock", "paper", "scissors"];
    
        //     for (let i = 0; i < 1000; i++) { 
        //         const randomHand = enemy.getRandomHand();
        //         expect(possibleHands).toContain(randomHand);
        //     }
        // });
        let randomSpy: jest.SpyInstance;

        beforeEach(() => {
            randomSpy = jest.spyOn(Math, 'random');
            randomSpy.mockReturnValue(0.5);
        })

        afterEach(() => {
            randomSpy.mockRestore();
        })

        test('乱数の返り値に応じてgetRandomHand()が正しい手を返す', () => {
            const enemy = new Enemy();
            const actual = enemy.getRandomHand();

            expect(actual).toBe('paper');
        });
    });
})
