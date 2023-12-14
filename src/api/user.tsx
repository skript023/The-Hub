import toast from "react-hot-toast";
import api from "./api";

class user
{
    async findAll()
    {
        try 
        {
            const response = await api.get('user', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json();

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