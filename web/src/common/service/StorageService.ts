class StorageService {
    private static tokenKey = "auth_token";

    // Lưu token vào localStorage
    static saveToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    // Lấy token từ localStorage
    static getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Xóa token khỏi localStorage
    static clearToken() {
        localStorage.removeItem(this.tokenKey);
    }
}

export default StorageService;
