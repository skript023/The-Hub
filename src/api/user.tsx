import toast from "react-hot-toast";
import api from "./api";
import User from "../interfaces/user.dto";

class user
{
    async findAll(): Promise<User | undefined>
    {
        try 
        {
            const response = await api.get('user', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as User;

                return json;
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