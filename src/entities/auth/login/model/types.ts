export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    data: string;
    errors: string[];
    statuscode: number;
}