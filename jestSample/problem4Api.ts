import axios from "axios";

export interface BloodTypeTest{
    id?: number;
    bloodTypeId?: number;
    text?: string;
};

export class FetchResultBloodTypeApi implements IFetchResultBloodTypeApi{
    
    public async getResultBloodTypeTest(bloodTypeId: number): Promise<BloodTypeTest>{
        var url: string = "https://my-json-server.typicode.com/hira-kenta/bloodTypeTestApi/bloodTypeTests/" + bloodTypeId;
        try{
            var { data } = await axios.get<BloodTypeTest>(url);
            console.log(data)
            return data;
        }catch(e){
            data = {
                id: undefined,
                bloodTypeId: undefined,
                text: undefined,
            }
            return data;
        };
    }
};

// add
export interface IFetchResultBloodTypeApi{
    getResultBloodTypeTest(bloodTypeId: number): Promise<BloodTypeTest>;
};

export class MockFetchResultBloodTypeApi implements IFetchResultBloodTypeApi{
    private mockData: BloodTypeTest[] = [
        {
          "id": 1,
          "bloodTypeId": 1,
          "text": "少しおおざっぱな性格です。"
        },
        {
          "id": 2,
          "bloodTypeId": 2,
          "text": "比較的おおざっぱな性格かもしれません。"
        },
        {
          "id": 3,
          "bloodTypeId": 3,
          "text": "おおざっぱなときとそうでないときがある性格かもしれません。"
        },
        {
          "id": 4,
          "bloodTypeId": 4,
          "text": "おおざっぱな性格です。"
        }
    ];

    public async getResultBloodTypeTest(bloodTypeId: number): Promise<BloodTypeTest> {
        const result: BloodTypeTest | undefined = this.mockData.find(item => item.bloodTypeId === bloodTypeId);
        if(result){
            return result;
        }else{
            const defaultResult: BloodTypeTest = {
                id: undefined,
                bloodTypeId: undefined,
                text: undefined,
            };
            return defaultResult;
        }
    }
}