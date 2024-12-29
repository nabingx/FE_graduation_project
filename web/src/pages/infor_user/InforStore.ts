import {makeAutoObservable, toJS} from "mobx";
import { HttpStatusCode } from "axios";
import {inforService} from "./InforService";
import {toastUtils} from "../../common/utils/Toastutils";

class InfoStore {
    isLoadingGetInfo: boolean = false;
    inforUser: any = {};

    dataChangePassword: {
        password: string;
        new_password: string;
    } = {

        password: "",
        new_password: "",
    };

    constructor() {
        makeAutoObservable(this);
    }

    async fetchGetInfoUser() {
        this.isLoadingGetInfo = true;
        const result = await inforService.fetchGetInfoUser();
        if (result.status === HttpStatusCode.Ok) {
            console.log("result",toJS(result))
            this.inforUser = result.body.data
            this.isLoadingGetInfo = false;

        } else {
            toastUtils.error(result.body.message, "");
        }
    }

    async fetchChangeInfoUser() {
        let {password, new_password} = this.dataChangePassword;
        const params = {
            password: password,
            new_password: new_password,
        };
        const result = await inforService.fetchChangeInfoUser(params);
        if (result.status === HttpStatusCode.Ok) {
            toastUtils.success("Thay đổi mật khẩu thành công", "");
        } else {
            toastUtils.error("Mật khẩu cũ không đúng", "");
        }
    }
    
}

export const infoStore = new InfoStore();