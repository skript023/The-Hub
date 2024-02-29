import { toast } from "../components/snackbar";
import ServerResponse from "../interfaces/response.dto";
import Role from "../interfaces/role.dto";
import api from "./api";

class role
{
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