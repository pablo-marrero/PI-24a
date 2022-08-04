import { LOGIN, LOGOUT } from "./actionTypes";
//, LOGOUT, LOADING_LOGIN, LOADING_LOGOUT
import { auth } from "../../Firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const loginWithGoogle = async()=>{
    let googleProvider = new GoogleAuthProvider()
    let response = await signInWithPopup(auth,googleProvider)
    
    if(response) return (dispatch) =>{
        dispatch({type: LOGIN, payload:response.user})
    }
}

export const uploadUser = (currentUser)=>{
    if(currentUser){
        return (dispatch) =>{
            dispatch({type: LOGIN, payload:currentUser})
        }
    }
    return null
}

export function startGoogleLogout(){
    return async (dispatch)=>{
        await signOut(auth)
        dispatch(logout())
    }
}

export const logout = ()=>{
    return (dispatch)=>{
        dispatch({type: LOGOUT, payload:""})
    }
}