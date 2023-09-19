import { BloodTypeTest, FetchResultBloodTypeApi } from "../problem4Api";

let mockError: boolean = false;

const successData: BloodTypeTest = {
    "id": 1,
    "bloodTypeId": 1,
    "text": "少しおおざっぱな性格です。"
};
const failData: BloodTypeTest = {
    "id": undefined,
    "bloodTypeId": undefined,
    "text": undefined
}

jest.mock('axios', () => ({
    get: jest.fn(async (url: string): Promise<{data: BloodTypeTest}> => {
        if(mockError){
            throw new Error();
        }
        return {data: successData};
    })
}));

describe("FetchResultBloodTypeApi", () => {
    
    test("APIからデータを取得できた場合、BloodTypeTestオブジェクトが返される", async () => {
        // Arrange
        const fetchResultBloodTypeApi: FetchResultBloodTypeApi = new FetchResultBloodTypeApi;
        // Act
        const actual: BloodTypeTest = await fetchResultBloodTypeApi.getResultBloodTypeTest(1);
        // Assert
        expect(actual).toEqual(successData);
    });

    test("APIからデータが取得できなかった場合、プロパティがundefinedのBloodTypeTestオブジェクトが返される", async () => {
        // Arrange
        const fetchResultBloodTypeApi: FetchResultBloodTypeApi = new FetchResultBloodTypeApi;
        mockError = true;
        // Act
        const actual: BloodTypeTest = await fetchResultBloodTypeApi.getResultBloodTypeTest(1);
        // Assert
        expect(actual).toEqual(failData);
    });
});
