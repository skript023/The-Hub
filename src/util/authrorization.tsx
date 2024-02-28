import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/authentication";
import { base } from "./base";

export default function Authorized() 
{
    const {auth} = useAuth();
    const location = useLocation();
    
    return (
        auth ? <Outlet/> : <Navigate to={ base } state={{ from: location }} replace/>
    )
}