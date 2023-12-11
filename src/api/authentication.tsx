import api from "./api";
import User from "../interfaces/user.dto";
import toast from "react-hot-toast";

class authentication 
{
    async login(username: string, password: string) : Promise<boolean>
    {
        try 
        {
            const response = await api.post('auth/login', {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const json = await response.json();

            toast.success(json.message);
        
            if (response.status === 200)
            {
                return true
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message);
        }

        return false
    }

    async userProfile(): Promise<boolean>
    {
        const response = await api.get('user/profile', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (response.status == 200)
        {
            const json = await response.json() as User;

            this.user = json;

            return true;
        }

        return false;
    }
    
    data(): User|undefined
    {
        return this.user;
    }

    private user: User | undefined;
}

export default new authentication()