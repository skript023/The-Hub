import { toast } from "../components/snackbar";
import ServerResponse from "../interfaces/response.dto";
import Role from "../interfaces/role.dto";
import api from "./api";

class role
{
    async create(role: Role): Promise<ServerResponse<Role[]> | undefined>
    {
        try 
        {
            const response = await api.post('role', {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async get(id?: string): Promise<ServerResponse<Role[]> | ServerResponse<Role> | undefined>
    {
        try 
        {
            const endpoint = id ? `role/${id}` : 'role'
            const response = await api.get(endpoint);

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async update(id: string, role: Role): Promise<ServerResponse<Role[]> | undefined>
    {
        try 
        {
            const response = await api.patch(`role/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Role Update', error.message);

            return undefined;
        }   
    }

    async remove(id:string) : Promise<ServerResponse<Role[]> | undefined>
    {
        try 
        {
            const response = await api.delete(`role/${id}`);

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Role Deletion', error.message);

            return undefined;
        }    
    }
}

export default new role();