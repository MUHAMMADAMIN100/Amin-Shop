export interface RegisterRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}


export interface RegisterResponse{
    statuscode:number;
    errors:string[]
}
