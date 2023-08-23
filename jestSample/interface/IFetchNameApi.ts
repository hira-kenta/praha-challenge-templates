import { UserName } from "../API/FetchNameApi";

export interface IFetchNameApi{
    getUserName(): Promise<UserName>;
}