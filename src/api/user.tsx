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

            return response.json();
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

            const json = await response.json() as ServerResponse<User[]>;

            json.data.map((user) => {
                user.expired = new Date(user.expired).toString();
                user.recent_login = new Date(user.recent_login).toString();
            });

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
    async update(id: string, user: User): Promise<ServerResponse<User> | undefined>
    {
        try 
        {
            const forms = new FormData();

            form.from_json(forms, '', user);

            forms.delete('_id');

            const response = await api.patch(`user/${id}`, { 
                credentials: 'include',
                body: forms
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
    async remove(id: string): Promise<ServerResponse<User> | undefined>
    {
        try 
        {
            const response = await api.delete(`user/${id}`, {  credentials: 'include' });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
}

export default new user();