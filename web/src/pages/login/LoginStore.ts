import {makeAutoObservable, toJS} from "mobx";
import { HttpStatusCode } from "axios";
import {loginService} from "./LoginService";
import {toastUtils} from "../../common/utils/Toastutils";

class LoginStore {

    dataRegister: {
        email: string;
        username: string;
        password: string;
    } = {
        email: "",
        username: "",
        password: "",
    }

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRegister() {
        let {email, username, password} = this.dataRegister;
        const params = {
            email: email,
            username: username,
            password: password,
        };
        const result = await loginService.fetchRegister(params);
        if (result.status === HttpStatusCode.Ok) {
            toastUtils.success("Tạo tài khoản thành công", "");
        } else {
            toastUtils.error("Tạo tài khoản thất bại", "");
        }
    }



}

export const loginStore = new LoginStore();