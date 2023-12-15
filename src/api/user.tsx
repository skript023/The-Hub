import toast from "react-hot-toast";
import api from "./api";
import User from "../interfaces/user.dto";
import ServerResponse from "../interfaces/response.dto";

class user
{
    async findAll(): Promise<User | undefined>
    {
        try 
        {
            const response = await api.get('user', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<User>;

                toast.success(json.message);

                return json.data;
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }

        return undefined;
    }
}

export default new user();