import { api } from "../../../app/api/api";
import type { RegisterRequest } from "../../../entities/auth/registration/model/types";

export const registerUser = async (payload: RegisterRequest) => {
    const { data } = await api.post(import.meta.env.VITE_APP_ACCOUNT_REGISTER_ENDPOINT, payload)
    return data
}