import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/authentication";
import { base } from "./base";
import { useEffect } from "react";
import authentication from "@/api/authentication";
import useRoute from "@/hooks/route";

export default function Unauthorized() 
{
    const { auth, setAuth } = useAuth();
    const { setRoute } = useRoute();
    const location = useLocation();

    const from = location.state?.from?.pathname || `${base}home`;

    useEffect(() => {
        if (!auth)
        {
            const user = authentication.data();
            const permission = user?.route.some(permission => permission.frontend === from) as boolean;
            setAuth(authentication.is_auth());  
            setRoute(permission);
        }
    }, [setAuth]);

    return (
        !auth ? <Outlet/> : <Navigate to={ from } state={{ from: location }} replace/>
    )
}