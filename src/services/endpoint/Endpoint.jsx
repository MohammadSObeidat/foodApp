import axios from "axios"
export const baseURL = 'https://upskilling-egypt.com:3006/api/v1'
export const imageBaseURL = 'https://upskilling-egypt.com:3006'

export const axiosInstance = axios.create({baseURL: baseURL, headers: {
    Authorization: localStorage.getItem('token')
}})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("token");
  
    return config;
});

export const axiosInstanceUrl = axios.create({baseURL: baseURL})

// USERS Endpoints
export const USERS_URL = {
    LOGIN: `/Users/Login`,
    REST_PASSWORD: `/Users/Reset`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    REGISTERATION: `/Users/Register`,
    VERIFY: `/Users/verify`,
    GET_USERS: `/Users/`,
    CHANGE_PASSWORD: `/Users/ChangePassword/`,
    GET_USER: (id) => `/Users/${id}`,
    DELETE_USER: (id) => `/Users/${id}`
}

// CATEGORY Endpoints
export const CATEGORY_URL = {
    GET_CATEGORIES: `/Category/`,
    GET_CATEGORY: (id) => `/Category/${id}`,
    POST_CATEGORY: `/Category/`,
    DELETE_CATEGIRY: (id) => `/Category/${id}`,
    PUT_CATEGIRY: (id) => `/Category/${id}`
}

// Recipes Endpoints
export const RECIPES_URL = {
    GET_RECIPES: `/Recipe/`,
    GET_RECIPE: (id) => `/Recipe/${id}`,
    POST_RECIPES: `/Recipe/`,
    DELETE_RECIPES: (id) => `/Recipe/${id}`,
    PUT_RECIPE: (id) => `/Recipe/${id}`
}

// Tags Endpoints
export const TAGS_URL = {
    GET_TAGS: `/tag/`,
}