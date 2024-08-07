export interface LoginForm {
    email: string,
    password: string,
    rememberMe: boolean
}

interface User {
    id: string,
    userName: string,
    normalizedUserName: string
    email: string,
    normalizedEmail: string,
    emailConfirmed: boolean,
    securityStamp: string,
    concurrencyStamp: string,
    phoneNumber: string,
    phoneNumberConfirmed: boolean,
    twoFactorEnabled: boolean,
    lockoutEnd: string,
    lockoutEnabled: boolean,
    accessFailedCount: number,
}
export interface LoginResponse {
    token: string,
    user: User
}