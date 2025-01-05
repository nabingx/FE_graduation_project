import {getRequest, postRequest} from "../../common/helpers/RequestHelper";


class InforService {
    apiGetInforUser = '/user-info'
    apiChangePassword = '/change-password'
    apiChageInfoUser = '/change-user-info'

    public fetchGetInfoUser(): Promise<any> {
        return getRequest(`${this.apiGetInforUser}`,'');
    }
    public fetchChangeInfoUser(params: any): Promise<any> {
        return postRequest(`${this.apiChageInfoUser}`, params);
    }

    public fetchChangePassword(params: any): Promise<any> {
        return postRequest(`${this.apiChangePassword}`, params);
    }
}

export const inforService = new InforService()
