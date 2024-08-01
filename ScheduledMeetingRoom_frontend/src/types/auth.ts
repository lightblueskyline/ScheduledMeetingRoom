export interface LoginRequest {
    Email: string;
    Password: string;
    RememberMe: boolean;
}

export interface LoginResponse {
    Token: string;
}