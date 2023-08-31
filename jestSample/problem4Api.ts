import axios from "axios";

export interface BloodTypeTest{
    id?: number;
    bloodTypeId?: number;
    text?: string;
};

export class FetchResultBloodTypeApi{
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

