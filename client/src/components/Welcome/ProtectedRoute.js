import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export function ProtectedRoute({children}){
    const user = useSelector((state)=> state.auth.uid)
        
    if(!user) {
        return <Redirect to='/welcome'/>
    }
    console.log("llego al children")
    return <>{children}</>
}