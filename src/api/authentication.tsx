import api from "./api";
import Profile from "../interfaces/profile.dto";
import { toast } from "../components/snackbar";

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
                toast.success('Authentication', json.message);

                return true;
            }
            else
            {
                toast.error('Authentication', json.message);
            }
        } 
        catch (error: any) 
        {
            toast.error('Authentication', error.message);
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
                toast.success('Logout', json.message);

                return true;
            }

            toast.success('Logout', json.message)
        } 
        catch (error: any) 
        {
            toast.error('Logout', error.message);
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

            if (!this.user)
            {
                this.setUser(json);
            }

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

        return `${api.server()}/user/avatar/${this.user?.image}`;
    }

    private setUser(user: Profile)
    {
        this.user = user;
    }

    private user: Profile | undefined;
}

export default new authentication()