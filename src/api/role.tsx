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
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

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
            const response = await api.get(endpoint, {
                credentials: 'include'
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

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
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(role)
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

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
            const response = await api.delete(`role/${id}`, {
                credentials: 'include'
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

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