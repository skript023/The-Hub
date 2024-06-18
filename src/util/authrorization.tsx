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
        const user = authentication.data();

        if (user) 
        {
            const access = user.route.some(route => route.frontend === location.pathname || location.pathname === base);
            setAuth(authentication.is_auth());
            setRoute(access);
        } 
        else 
        {
            setAuth(false);
        }
    }, [location.pathname, setAuth, setRoute]);
    
    if (!auth) 
    {
        return <Navigate to={base} state={{ from: location }} replace />;
    }

    if (auth && !route) 
    {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
}