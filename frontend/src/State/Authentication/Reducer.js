import {
    GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_WITH_GOOGLE_REQUEST, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REQUEST_RESET_PASSWORD_FAILURE, REQUEST_RESET_PASSWORD_REQUEST, REQUEST_RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST,
    SAVE_PROFILE_FAILURE, SAVE_PROFILE_REQUEST, SAVE_PROFILE_SUCCESS,
    FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, // New action types
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    success: null,
    profile: null,
    hunts: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case LOGIN_WITH_GOOGLE_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case REQUEST_RESET_PASSWORD_REQUEST:
        case SAVE_PROFILE_REQUEST: // Add SAVE_PROFILE_REQUEST here
        case FETCH_PROFILE_REQUEST: // Add FETCH_PROFILE_REQUEST here
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, success: "Register Success" };

        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, success: "Login Success" };

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload };

        case REQUEST_RESET_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, success: action.payload?.message };

        case SAVE_PROFILE_SUCCESS:
            console.log("Profile Saved:", action.payload);
            return { ...state, isLoading: false, profile: action.payload };

        case FETCH_PROFILE_SUCCESS: // New success case for fetching profile
            console.log("Fetched Profile:", action.payload);
            return { ...state, isLoading: false, profile: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case REQUEST_RESET_PASSWORD_FAILURE:
        case SAVE_PROFILE_FAILURE: // Handle SAVE_PROFILE_FAILURE
        case FETCH_PROFILE_FAILURE: // Handle FETCH_PROFILE_FAILURE
            return { ...state, isLoading: false, error: action.payload };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, profile: action.payload, error: null };
        case UPDATE_PROFILE_FAILURE:
            return { ...state, error: action.payload };
        case LOGOUT:
            localStorage.removeItem("jwt");
            return { ...state, jwt: null, user: null, profile: null, success: "logout success" };

        default:
            return state;
    }
};

export default authReducer;
