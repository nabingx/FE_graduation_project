import {postRequest} from "../../common/helpers/RequestHelper";


class LoginService {
    apiRegister = '/register';

    public fetchRegister(params: any): Promise<any> {
        return postRequest(`${this.apiRegister}`,params);
    }
}

export const loginService = new LoginService()