import Axios from "axios"

export async function loadData() {
    return await Axios.get(`/api/loadData`)
}

export const addList = async(listname: string) => {
    return await Axios.post(`/api/addList/:${listname}`)
}

export const deleteList = async(listname: string) => {
    return await Axios.delete(`/api/deleteList/:${listname}`)
}

export const addItem = async(listname: string, item: string) => {
    return await Axios.post(`/api/addItem/:${listname}/:${item}`)
}

export const deleteItem = async(listname: string, item: string) => {
    return await Axios.delete(`/api/deleteItem/:${listname}/:${item}`)
}

export const login = async(id: string, password: string) => {
    return await Axios.post('login', {"id": id, "password": password})
}

export async function loginCheck() {
    return await Axios.get(`/login/auth`)
}