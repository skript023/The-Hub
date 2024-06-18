import api from "./api";
import Profile from "@/interfaces/profile.dto";
import { toast } from "@/components/snackbar";
import storage from "@/util/storage";

class authentication extends(storage)
{
    async login(identity: string, password: string) : Promise<boolean>
    {
        try 
        {
            const response = await api.post('auth/login', {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    identity,
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

    async loginWithGoogle() : Promise<boolean>
    {
        try 
        {
            const response = await api.get('auth/google');

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
            const response = await api.get('auth/logout');
    
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
            }
        });

        if (response.status == 200)
        {
            const json = await response.json() as Profile;

            if (!this.isAuth)
            {
                this.setUser(json);
            }

            return json;
        }

        return null;
    }

    async checkAuth(): Promise<boolean>
    {
        const response = await api.get('auth/check', {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status == 200)
        {
            const json = await response.json() as {message: string; success: boolean};

            return json.success;
        }

        this.clearData();

        return false;
    }
    
    data(): Profile | null
    {
        const data = this.getData('USER');
        if (data)
            return JSON.parse(data) as Profile | null;
        
        return null;
    }

    is_auth(): boolean 
    {
        this.isAuth = !!this.getData('USER');
        return this.isAuth as boolean;
    }

    avatar()
    {
        if (!this.data())
            return 'https://via.placeholder.com/800x500';

        return `${api.server()}/user/avatar/${this.data()?.image}`;
    }

    private setUser(user: Profile)
    {
        this.setData('USER', JSON.stringify(user));
        this.isAuth = true;
    }

    private isAuth: boolean | undefined;
}

export default new authentication()