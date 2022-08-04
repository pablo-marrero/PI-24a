import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import React from "react";

export function ProtectedRoute({children}){
    const user = useSelector((state)=> state.auth.uid)
        
    if(!user) {
        return <Redirect to='/welcome'/>
    }
    return <>{children}</>
}