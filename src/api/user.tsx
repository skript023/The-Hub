import api from "./api";
import User from "../interfaces/user.dto";
import ServerResponse from "../interfaces/response.dto";
import form from "../util/form";
import { toast } from "../components/snackbar";

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
                body: forms
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Create User', error.message);

            return undefined;
        }
    }
    async findAll(): Promise<User[] | undefined>
    {
        try 
        {
            const response = await api.get('user');

            const json = await response.json() as ServerResponse<User[]>;

            json.data.map((user) => {
                user.expired = new Date(user.expired).toString();
                user.recent_login = new Date(user.recent_login).toString();
            });

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error('Get User', error.message);

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
                body: forms
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Update User', error.message);

            return undefined;
        }
    }
    async remove(id: string): Promise<ServerResponse<User> | undefined>
    {
        try 
        {
            const response = await api.delete(`user/${id}`);

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Delete User', error.message);


            return undefined;
        }
    }
}

export default new user();