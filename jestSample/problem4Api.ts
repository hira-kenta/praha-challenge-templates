import axios from "axios";

export interface BloodTypeTest{
    id?: number;
    bloodTypeId?: number;
    text?: string;
};

export interface IFetchResultBloodTypeApi {
    getResultBloodTypeTest(bloodTypeId: number): Promise<BloodTypeTest>;
}

export class FetchResultBloodTypeApi implements IFetchResultBloodTypeApi{
    public async getResultBloodTypeTest(bloodTypeId: number){
        var url: string = "https://my-json-server.typicode.com/hira-kenta/bloodTypeTestApi/bloodTypeTests/" + bloodTypeId;
        try{
            var { data } = await axios.get<BloodTypeTest>(url);
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
}

/// Below is MockAPI
export class MockSuccessFetchResultBloodTypeApi implements IFetchResultBloodTypeApi{
    public async getResultBloodTypeTest(bloodTypeId: number){
        let data = {
            id: 1,
            bloodTypeId: 1,
            text: "少しおおざっぱな性格です。",
        }
        return data;
    }
}

export class MockFailedFetchResultBloodTypeApi implements IFetchResultBloodTypeApi{
    public async getResultBloodTypeTest(bloodTypeId: number){
        let data = {
            id: undefined,
            bloodTypeId: undefined,
            text: undefined,
        }
        return data;
    }
}