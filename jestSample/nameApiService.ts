import { UserName } from "./API/FetchNameApi";
import { IFetchNameApi } from "./interface/IFetchNameApi";

// Nameを取得するサービスクラス
export class NameApiService {
  // disabled : 不適切なフィールドと考えコメントアウト
  // private MAX_LENGTH = 4;
  private fetchNameApi: IFetchNameApi;
  
  public constructor(fetchNameApi: IFetchNameApi) {
    this.fetchNameApi = fetchNameApi
  }

  // add : ユーザー名を取得する関数を作成
  // 純粋にユーザー名を取得するだけのメソッドに切り分けることで、テスタビリティを向上。
  private async getUserName(): Promise<UserName> {
    return this.fetchNameApi.getUserName();
  }

  public async getFirstName(): Promise<string> {
    const userName: UserName = await this.getUserName();
    const firstName = userName.first_name;
    // disabled : 不適切なロジックと考えコメントアウト
    // if (firstName.length > this.MAX_LENGTH) {
    //   throw new Error("firstName is too long!");
    // }
    return firstName;
  }
}