import axios from 'axios';
import {
    CREATE_HUNT_FAILURE, CREATE_HUNT_REQUEST, CREATE_HUNT_SUCCESS, FETCH_CLUE_BY_ID_FAILURE, FETCH_CLUE_BY_ID_REQUEST, FETCH_CLUE_BY_ID_SUCCESS, FETCH_HUNT_FAILURE, FETCH_HUNT_REQUEST, FETCH_HUNT_SUCCESS, GET_ALL_HUNTS_BY_ID_FAILURE, GET_ALL_HUNTS_BY_ID_REQUEST, GET_ALL_HUNTS_BY_ID_SUCCESS, GET_ALL_HUNTS_FAILURE, GET_ALL_HUNTS_REQUEST, GET_ALL_HUNTS_SUCCESS,
    JOIN_HUNT_ERROR,
    JOIN_HUNT_REQUEST,
    JOIN_HUNT_SUCCESS,
    SEARCH_HUNT_FAILURE, SEARCH_HUNT_SUCCESS, SOLVE_CLUE_FAILURE, SOLVE_CLUE_REQUEST, SOLVE_CLUE_SUCCESS
} from './ActionType';
// create hunt
export const createHunt=(huntData)=>async(dispatch)=>{
    dispatch({type:CREATE_HUNT_REQUEST});
    try{
        const response=await axios.post('http://localhost:5454/hunt/create', huntData);
        dispatch({type:CREATE_HUNT_SUCCESS,payload:response.data});
    }catch(error){
        dispatch({type:CREATE_HUNT_FAILURE,payload:error.message});
    }
};

// fetch hunt by id
export const fetchHuntById=(data)=>async(dispatch)=>{
    dispatch({type:FETCH_HUNT_REQUEST});
    try{
        const response=await axios.get(`http://localhost:5454/hunt/fetchHunt`,data);
        dispatch({type:FETCH_HUNT_SUCCESS,payload:response.data});
    }catch(error){
        dispatch({type:FETCH_HUNT_FAILURE,payload:error.message});
    }
}

// Fetch Clue by ID
export const fetchClueById = (data) => async (dispatch) => {
    dispatch({ type: FETCH_CLUE_BY_ID_REQUEST });
    try {
        const response = await axios.get(`http://localhost:5454/hunt/fetch-clue-by-id`,data);
        dispatch({ type: FETCH_CLUE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CLUE_BY_ID_FAILURE, payload: error.message });
    }
};

export const solveClue = (data) => async (dispatch) => {
    dispatch({ type: SOLVE_CLUE_REQUEST });
    try {
        const response = await axios.put("http://localhost:5454/hunt/solve-clue", data);
        
        dispatch({ type: SOLVE_CLUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: SOLVE_CLUE_FAILURE, payload: error.message });
    }
};
export const getAllHuntsById=(data)=>async(dispatch)=>{
    dispatch({type:GET_ALL_HUNTS_BY_ID_REQUEST});
    try{
        console.log("Data :",data);
        const response=await axios.get('http://localhost:5454/hunt/getHuntsById',{
            params:{profileId:data.profileId}
        });
        console.log("Response :",response.data);
        dispatch({type:GET_ALL_HUNTS_BY_ID_SUCCESS,payload:response.data});
    }catch(error){
        console.log(error);
        dispatch({type:GET_ALL_HUNTS_BY_ID_FAILURE,payload:error.message});
    }
}
export const getAllHunts=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_HUNTS_REQUEST});
    try{
        const response=await axios.get('http://localhost:5454/hunt/getAllHunts');
        console.log("Response Data :",response.data);
        dispatch({type:GET_ALL_HUNTS_SUCCESS, payload:response.data});
    } catch(error) {
        dispatch({type:GET_ALL_HUNTS_FAILURE, payload:error.message});
    }
}
export const searchHunt=(data)=>async(dispatch)=>{
    dispatch({type:GET_ALL_HUNTS_REQUEST});
    try{
        const response=await axios.get('http://localhost:5454/hunt/searchHunt',data);
        dispatch({type:SEARCH_HUNT_SUCCESS,payload:response.data});
    }catch(error){
        dispatch({type:SEARCH_HUNT_FAILURE,payload:error.message});
    }
}

export const joinHunt = (data) => async (dispatch) => {
    try {
        dispatch({type: JOIN_HUNT_REQUEST, payload: data});
        const response = await axios.post('http://localhost:5454/hunt/join-hunt', data);
        console.log(response.data);
        dispatch({ type: JOIN_HUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({type: JOIN_HUNT_ERROR, payload: error.message});
    }
}