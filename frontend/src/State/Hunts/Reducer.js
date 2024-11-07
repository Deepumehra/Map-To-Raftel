import {
    CREATE_HUNT_FAILURE,
    CREATE_HUNT_REQUEST,
    CREATE_HUNT_SUCCESS,
    FETCH_CLUE_BY_ID_FAILURE,
    FETCH_CLUE_BY_ID_REQUEST,
    FETCH_CLUE_BY_ID_SUCCESS,
    FETCH_HUNT_FAILURE,
    FETCH_HUNT_REQUEST,
    FETCH_HUNT_SUCCESS,
    GET_ALL_HUNTS_BY_ID_FAILURE,
    GET_ALL_HUNTS_BY_ID_REQUEST,
    GET_ALL_HUNTS_BY_ID_SUCCESS,
    GET_ALL_HUNTS_FAILURE,
    GET_ALL_HUNTS_REQUEST,
    GET_ALL_HUNTS_SUCCESS,
    SEARCH_HUNT_FAILURE,
    SEARCH_HUNT_REQUEST,
    SEARCH_HUNT_SUCCESS,
    SOLVE_CLUE_FAILURE,
    SOLVE_CLUE_REQUEST,
    SOLVE_CLUE_SUCCESS,
} from './ActionType';
const initialState={
    activeHunts:[],
    completedHunts:[],
    currentHunt:null,
    search:[],
    allHunts: [],
    clue:null,
    loading:false,
    error:null,
    success:null,
}
export const huntReducer=(state=initialState,action)=>{
    switch(action.type){
        case CREATE_HUNT_REQUEST:
        case FETCH_HUNT_REQUEST:
        case SOLVE_CLUE_REQUEST:
        case SEARCH_HUNT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case FETCH_CLUE_BY_ID_REQUEST:
        case GET_ALL_HUNTS_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ALL_HUNTS_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_HUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                success:"Hunt Created successfully",
                activeHunts:[...state.activeHunts,action.payload]
            }
        case FETCH_HUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                currentHunt:action.payload,
                success:"Hunt Fetched successfully",
            }
        case FETCH_CLUE_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                success:"Clue fetched succesfully",
                clue:action.payload,
            }
        case SOLVE_CLUE_SUCCESS:
            return {
                ...state,
                loading:false,
                activeHunts:state.activeHunts.map((hunt)=>
                hunt.huntId===action.payload.huntId ? {
                    ...hunt,
                    solvedClues:[...hunt.solvedClues,action.payload.solvedClue],
                    currentClueId:action.payload.nextClueId,
                }:hunt
                ),
                success:"Clue solved successfully",
            }
        case GET_ALL_HUNTS_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                activeHunts:action.payload.activeHunts,
                completedHunts:action.payload.completedHunts,
                success:"All hunts fetched successfully"
            }
        case GET_ALL_HUNTS_SUCCESS:
            return {
                ...state,
                loading:false,
                allHunts:action.payload,
                success: "All Hunts are fetched successfully"
            }
        case SEARCH_HUNT_SUCCESS:
            return {
                ...state,
                loading:false,
                search:action.payload,
                success:"Search hunt finished successfully"
            }
        case CREATE_HUNT_FAILURE:
        case FETCH_HUNT_FAILURE:
        case SOLVE_CLUE_FAILURE:
        case FETCH_CLUE_BY_ID_FAILURE:
        case SEARCH_HUNT_FAILURE:
        case GET_ALL_HUNTS_FAILURE:
            return { ...state, loading: false, error: action.payload, success: null };
        case GET_ALL_HUNTS_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload, success: null };
        default:
            return state;
    }
}