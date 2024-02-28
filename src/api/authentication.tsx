import api from "./api";
import toast from "react-hot-toast";
import Profile from "../interfaces/profile.dto";

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

            if (response.status === 200)
            {
                toast.success(json.message);

                return true;
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message);
        }

        return false
    }

    async logout() : Promise<boolean>
    {
        try 
        {
            const response = await api.get('auth/logout', {
                credentials: 'include'
            });
    
            const json = await response.json();
    
            if (response.status === 200)
            {
                toast.success(json.message);

                return true;
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message);
        }

        return false;
    }

    async userProfile(): Promise<Profile | null>
    {
        const response = await api.get('user/profile/detail', {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        if (response.status == 200)
        {
            const json = await response.json() as Profile;

            this.user = json;

            return json;
        }

        return null;
    }
    
    data(): Profile | undefined
    {
        return this.user;
    }

    avatar()
    {
        if (!this.data())
            return 'https://via.placeholder.com/800x500';

        return `${api.server()}/user/avatar/${this.data()?.image}`;
    }

    private user: Profile | undefined;
}

export default new authentication()