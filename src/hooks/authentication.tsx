import { useContext } from "react";
import AuthContext from '../context/authentication';

export default function useAuth() 
{
    return useContext(AuthContext);
}