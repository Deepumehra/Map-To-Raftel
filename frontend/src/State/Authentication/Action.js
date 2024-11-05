/* eslint-disable no-unused-vars */
import axios from 'axios';
import { api } from '../../Helper/api';
import {
    FETCH_PROFILE_FAILURE,
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SAVE_PROFILE_FAILURE,
    SAVE_PROFILE_REQUEST,
    SAVE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
} from "./ActionType";
export const registerUser=(reqData)=>async(dispatch)=>{
    // console.log("Regsiter Request Data :",reqData.userData);
    try{
        dispatch({type:REGISTER_REQUEST});
        const {data}=await axios.post(`http://localhost:5454/auth/signup`,reqData.userData);
        console.log("Data :",data);
        if(data.token){
            localStorage.setItem("JWT",data.token);
        }
        reqData.navigate('/profile');
        dispatch({type:REGISTER_SUCCESS,payload:data.token});
    }catch(error){
        console.log("catch error ------ ",error)
        dispatch({
        type: REGISTER_FAILURE,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};
export const loginUser=(reqData)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const {data}=await axios.post(`http://localhost:5454/auth/login`,reqData.data);
        // console.log(data)
        if(data.jwt){
            localStorage.setItem("JWT",data.token);
        }

        reqData.navigate('/');
        dispatch({type:LOGIN_SUCCESS,payload:data.token});
    }catch(error){
        dispatch({
            type:LOGIN_FAILURE,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const saveProfile=(reqData)=>{
    const jwt=localStorage.getItem('JWT');
    console.log("jwt :",jwt);
    return async (dispatch)=>{
        dispatch({type:SAVE_PROFILE_REQUEST});
        console.log("Req Data :",reqData)
        try{
            const response=await axios.post('http://localhost:5454/auth/save-profile',reqData,{
                headers: {
                    authorization: `Bearer ${jwt}`
                },
            })
            console.log("Response :",response.data.profile);
            dispatch({type:SAVE_PROFILE_SUCCESS,payload:response.data.profile});
        }catch(error){
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({ type: SAVE_PROFILE_FAILURE, payload: errorMessage });
        }
    }
}

// Action to fetch user profile
export const fetchProfile = () => {
    const jwt = localStorage.getItem('JWT');
    console.log("jwt:", jwt);
    return async (dispatch) => {
        dispatch({ type: FETCH_PROFILE_REQUEST });

        try {
            const response = await axios.get('http://localhost:5454/auth/fetch-profile', {
                headers: {
                    authorization: `Bearer ${jwt}`
                },
            });
            
            console.log("Response:", response.data.profile);
            dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data.profile });
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({ type: FETCH_PROFILE_FAILURE, payload: errorMessage });
        }
    };
};

export const updateProfile = (profileData) => async (dispatch) => {
    try {
        const jwt = localStorage.getItem('JWT');
        const response = await axios.put('http://localhost:5454/auth/update-profile', profileData, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("Response :",response.data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.profile });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
};


export const getUser = (token) => {
    // console.log("Token :",token);
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await api.get(`/auth/user`, {
                headers: {
                    authorization: `Bearer ${token}`
                },
            });
            
            console.log("Response:", response);
            const user = response.data.user;
            dispatch({ type: GET_USER_SUCCESS, payload: user });
            // console.log("Req User:", user);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        }
    }
}

export const resetPasswordRequest=(email)=>async(dispatch)=>{

}

export const resetPassword=(reqData)=>async(dispatch)=>{

}

export const logout=()=>{
    return async(dispatch)=>{
        dispatch({type:LOGOUT});
        localStorage.clear();
    }
};
