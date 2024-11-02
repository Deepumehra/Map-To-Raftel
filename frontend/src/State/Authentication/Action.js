/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "./ActionType";
export const registerUser=(reqData)=>async(dispatch)=>{
    console.log("Regsiter Request Data :",reqData.userData);
    try{
        dispatch({type:REGISTER_REQUEST});
        const {data}=await axios.post(`http://localhost:5454/auth/signup`,reqData.userData);
        if(data.jwt){
            localStorage.setItem("JWT",data.jwt);
        }
        reqData.navigate('/profile');
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt});
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
        if(data.jwt){
            localStorage.setItem("JWT",data.jwt);
        }
        reqData.navigate('/');
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt});
    }catch(error){
        dispatch({
            type:LOGIN_FAILURE,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const loginWithGoogle=(reqData)=>async(dispatch)=>{

}
export const getUser=(token)=>{

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
