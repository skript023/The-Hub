import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/authentication";
import { base } from "./base";

export default function Authorized() 
{
    const {auth} = useAuth() as any;
    const location = useLocation();
    console.log(auth);
    
    return (
        auth ? <Outlet/> : <Navigate to={ base } state={{ from: location }} replace/>
    )
}