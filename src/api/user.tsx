import toast from "react-hot-toast";
import api from "./api";
import User from "../interfaces/user.dto";
import ServerResponse from "../interfaces/response.dto";
import form from "../util/form";

class user
{
    async create(user: User): Promise<ServerResponse<User> | undefined>
    {
        try 
        {
            const forms = new FormData();

            form.from_json(forms, '', user);

            forms.delete('_id');

            const response = await api.post('user', { 
                credentials: 'include',
                body: forms
            });

            if (response.status == 201)
            {
                return response.json();
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
    async findAll(): Promise<User[] | undefined>
    {
        try 
        {
            const response = await api.get('user', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<User[]>;

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