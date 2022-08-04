import { LOGIN, LOGOUT, LOADING_LOGIN, LOADING_LOGOUT } from "../action/actionLogin&Register/actionTypes";

const initialState = {
    uid: null,
    displayName: ""
}

export const authReducer= (state = initialState, {type, payload}) =>{
    switch (type) {
        case LOGIN:{
            return {
                ...state,
                uid: payload.uid,
                displayName: payload.displayName
            }
        }
        case LOGOUT:{
            return initialState
        }
        case LOADING_LOGIN:{
            return {
                
            }
        }
        case LOADING_LOGOUT:{
            return {
                
            }
        }
    
        default:
            return state
    }
} 