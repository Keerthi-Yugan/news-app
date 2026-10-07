import axios from "axios";

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

type LoginData = {
    email: string;
    password: string;
};

export async function registerUser(data: RegisterData) {
    const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
    );

    return response.data;
}

export async function loginUser(data: LoginData) {
    const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
    );

    return response.data;
}

export async function forgotPasswordUser(email: string) {
    const response = await axios.post(
        "http://localhost:5000/api/auth/forget-password",
        {
            email,
        }
    );

    return response.data;
}