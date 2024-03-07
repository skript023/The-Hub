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

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async findAll(): Promise<ServerResponse<Role[]> | undefined>
    {
        try 
        {
            const response = await api.get('role', {
                credentials: 'include'
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

export default new role();