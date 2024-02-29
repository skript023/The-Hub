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

            const json = await response.json() as ServerResponse<Role[]>;
    
            if (response.status == 200)
            {
                return json;
            }

            toast.error('Roles', json.message);

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }
}

export default new role();