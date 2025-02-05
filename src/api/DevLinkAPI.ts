import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, type ProfileForm, userHandle } from "../types";

export async function getUser() {

    const token = localStorage.getItem('token_milink_auth');
    if (!token) {
        throw new Error('Token no encontrado');
    }
    try{
        const { data } = await api<User>('/user') // make a request to the /user endpoint
        // here actiton the interceptor to add the token to the request
        return data; // return the user data to the useQuery hook
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          } else if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Error desconocido');
          }
    }
}

export async function updateUser(formData: ProfileForm) {
    try {

        const { data } = await api.patch<string>('/user', formData) // make a request to the /user endpoint
        return data; // return the user data to the useQuery hook
        
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          } else if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Error desconocido');
          }
    }
}

export async function uploadImage(file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data : {image} } : {data: {image : string}} = await api.post('/user/image', formData);
        return image;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          } else if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Error desconocido');
          }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const { data } = await api<userHandle>(`/${handle}`);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          } else if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Error desconocido');
          }
    }
}

export async function searchByHandle(handle: string) {
    try {
        const { data } = await api.post<string>('/search', { handle });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          } else if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Error desconocido');
          }
    }
}
