import { FetchNameApiMock, UserName } from "../API/FetchNameApi"
import { INameApiService } from "../API/Interface/INameApiService"
import { IFetchNameApi } from "../interface/IFetchNameApi"
import { NameApiService } from "../nameApiService"

describe('getFirstName test', () => {
    // firstNameが取得できるかは1ケースで十分であると考えるためコメントアウト
    // test('Length of FirstName is 3 should return FirstName ', async () => {
    //     // SetUp
    //     const userName : UserName = {
    //         id: '123',
    //         name: 'Yamada Jun',
    //         first_name: 'Jun',
    //         last_name: 'Yamada',
    //     }
    //     const fetchNameApi: IFetchNameApi = new FetchNameApiMock(userName);
    //     const nameApiService: INameApiService = new NameApiService(fetchNameApi);
    //     // Exercise
    //     const actual: string = await nameApiService.getFirstName();
    //     // Verify
    //     expect(actual).toBe('Jun');
    // });

    test('User name id Tanaka Taro should return Taro', async () => {
        // SetUp
        const userName : UserName = {
            id: '234',
            name: 'Tanaka Taro',
            first_name: 'Taro',
            last_name: 'Tanaka',
        }
        const fetchNameApi: IFetchNameApi = new FetchNameApiMock(userName);
        const nameApiService: INameApiService = new NameApiService(fetchNameApi);
        // Exercise
        const actual: string = await nameApiService.getFirstName();
        // Verify
        expect(actual).toBe('Taro');
    });

    // throw処理は削除したためコメントアウト
    // test('Length of FirstName is 5 should throw Error', async () => {
    //     // SetUp
    //     const userName : UserName = {
    //         id: '234',
    //         name: 'Maeda Kenta',
    //         first_name: 'Kenta',
    //         last_name: 'Maeda',
    //     }
    //     const fetchNameApi: IFetchNameApi = new FetchNameApiMock(userName);
    //     const nameApiService: INameApiService = new NameApiService(fetchNameApi);
    //     // Exercise,Verify
    //     await expect(nameApiService.getFirstName()).rejects.toThrowError('firstName is too long!');
    // })
})