import { useContext } from "react";
import RouteContext from "../context/route";

export default function useRoute() 
{
    return useContext(RouteContext);
}