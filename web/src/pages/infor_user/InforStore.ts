import {makeAutoObservable, toJS} from "mobx";
import { HttpStatusCode } from "axios";
import {inforService} from "./InforService";
import {toastUtils} from "../../common/utils/Toastutils";

class InfoStore {
    isLoadingGetInfo: boolean = false;
    inforUser: any = {};

    dataChangeInfor: {
        username: string;
        email: string;
        avatar: File | null;
    } = {
        username: "",
        email: "",
        avatar: null,
    };

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

    async fetchChangePassword() {
        let {password, new_password} = this.dataChangePassword;
        const params = {
            password: password,
            new_password: new_password,
        };
        const result = await inforService.fetchChangePassword(params);
        if (result.status === HttpStatusCode.Ok) {
            toastUtils.success("Thay đổi mật khẩu thành công", "");
        } else {
            toastUtils.error("Mật khẩu cũ không đúng", "");
        }
    }

    // async fetchChangeInfoUser() {
    //     let {username,email,avatar} = this.dataChangeInfor;
    //     const params = {
    //         username: username,
    //         email: email,
    //         avatar: avatar,
    //     };
    //     const result = await inforService.fetchChangeInfoUser(params);
    //     if (result.status === HttpStatusCode.Ok) {
    //         toastUtils.success("Thay đổi thông tin thành công", "");
    //     } else {
    //         toastUtils.error("Thay đổi thông tin thất bại", "");
    //     }
    // }
    async fetchChangeInfoUser(formData: FormData) {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch("http://103.138.113.68/BE/change-user-info", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("User info updated:", data);
            if (data.status === 200) {
                this.inforUser = { ...this.inforUser, ...data };
            }
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    }

}

export const infoStore = new InfoStore();