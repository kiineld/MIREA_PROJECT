import api from '@/api';


export async function Login(payload) {
    return await api.post('/auth/login/', payload);
}

export async function Logout() {
    return await api.post('/auth/logout')
}

export async function Register(payload) {
    return await api.post("/auth/registration/", payload);
}

export async function GetCurrentUser() {
    return await api.get('/auth/user/');
}