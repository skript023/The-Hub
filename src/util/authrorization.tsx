import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/authentication";
import { base } from "./base";
import { useEffect } from "react";
import authentication from "../api/authentication";

export default function Authorized() 
{
    const {auth, setAuth} = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!auth)
        {
            authentication.userProfile()
            .then((success) => { 
                setAuth(success);
            })
            .catch((_e: any)=> {
                setAuth(null);
            });
        }
    });
    
    return (
        auth ? <Outlet/> : <Navigate to={ base } state={{ from: location }} replace/>
    )
}