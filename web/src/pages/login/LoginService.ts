class LoginService {
    static async authenticateUser(username: string, password: string): Promise<boolean> {
        // Giả lập API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(username === "admin" && password === "password");
            }, 1000);
        });
    }
}

export default LoginService;
