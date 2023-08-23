import { IFetchNameApi } from "../interface/IFetchNameApi";
import axios from "axios";

// add : APIから返ってくる値を格納するUserName
export interface UserName{
    id: string;
    name: string;
    first_name: string;
    last_name: string;
}

export class FetchNameApi implements IFetchNameApi{
    // fix : UserName型のデータを返却するよう修正
    // 修正前の状態だと文字列を返すという情報のみにとどまるため、firstNameが返ってきたのか不透明なまま利用することになる。
    public async getUserName(): Promise<UserName>{
        const { data } = await axios.get<UserName>(
            "https://random-data-api.com/api/name/random_name"
        );
        return data;
    };
};

export class FetchNameApiMock implements IFetchNameApi{
    private userName: UserName;
    
    constructor(userName: UserName){
        this.userName = userName;
    }
    
    public async getUserName(): Promise<UserName>{
        return this.userName;
    }
};