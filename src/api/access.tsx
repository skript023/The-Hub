import Access from "../interfaces/access";
import api from "./api";
import ServerResponse from '../interfaces/response.dto';
import { toast } from "../components/snackbar";

export default class access 
{
    static async create(access: Access): Promise<ServerResponse<Access> | undefined>
    {
        try 
        {
            const response = await api.post('route', {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(access)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    static async get(id?: string): Promise<ServerResponse<Access> | ServerResponse<Access[]> | undefined>
    {
        try 
        {
            const endpoint = id ? `route/${id}` : 'route'
            const response = await api.get(endpoint);

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    static async update(id: string, access: Access): Promise<ServerResponse<Access> | undefined>
    {
        try 
        {
            const response = await api.patch(`route/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(access)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    static async remove(id: string): Promise<ServerResponse<Access> | undefined>
    {
        try 
        {
            const response = await api.delete(`route/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }
}