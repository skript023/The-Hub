import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/authentication";
import { base } from "./base";
import { useEffect } from "react";
import authentication from "../api/authentication";
import useRoute from "../hooks/route";

export default function Authorized() 
{
    const location = useLocation();
    const { auth, setAuth } = useAuth();
    const { route, setRoute } = useRoute();

    useEffect(() => {
        authentication.userProfile()
        .then((success) => { 
            const access = success?.route.some(route => route.frontend === location.pathname) as boolean;
            setAuth(success);
            setRoute(access);
        })
        .catch((_e: any)=> {
            setAuth(null);
        });
    }, [location, route]);
    
    if (auth)
    {
        return (
            route ? <Outlet/> : <Navigate to="/forbidden" state={{ from: location }} replace/>
        );
    }
    
    return (
        <Navigate to={ base } state={{ from: location }} replace/>
    );
}