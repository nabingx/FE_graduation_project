import { makeAutoObservable } from "mobx";

class LoginStore {
    username: string = "";
    password: string = "";
    isAuthenticated: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    authenticate(username: string, password: string): boolean {
        if (username === "admin" && password === "password") {
            this.isAuthenticated = true;
            return true;
        }
        return false;
    }
}

const loginStore = new LoginStore();
export default loginStore;
