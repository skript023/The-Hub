import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/authentication";
import { base } from "./base";
import { useEffect } from "react";
import authentication from "../api/authentication";

export default function Unauthorized() 
{
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    const from = location.state?.from?.pathname || `${base}home`;

    useEffect(() => {
        authentication.userProfile()
        .then((success) => { 
            setAuth(success);
        })
        .catch((_e: any)=> {
        });
    });

    return (
        !auth ? <Outlet/> : <Navigate to={ from } state={{ from: location }} replace/>
    )
}