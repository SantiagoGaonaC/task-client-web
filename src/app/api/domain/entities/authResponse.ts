export interface IUserResponse {
    message: string
    uuid: string
    name: string
    email: string
}

export interface IUserLoginResponse {
    uuid: string
    name: string
    email: string
    token: string
}