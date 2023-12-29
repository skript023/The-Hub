import toast from "react-hot-toast";
import Task from "../interfaces/task.dto";
import api from "./api";
import ServerResponse from "../interfaces/response.dto";
import formatter from "../util/formatter";

class task
{
    async complete(id: string): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.patch(`activity/complete/${id}`, { 
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status == 200)
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
    async create(task: Task): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.post('activity', { 
                credentials: 'include',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
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
    async findAll(): Promise<Task[] | undefined>
    {
        try 
        {
            const response = await api.get('activity', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Task[]>;
                
                json.data.map((data) => {
                    data.start_date = formatter.convertDateFormat(data.start_date as any);
                    data.end_date = formatter.convertDateFormat(data.end_date as any);
                });

                return json.data;
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }

    async findOne(id: string): Promise<Task | undefined>
    {
        try 
        {
            const response = await api.get(`activity/${id}`, { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Task>;

                toast.success(json.message);

                return json.data;
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
    async update(id: string, task: Task): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.patch(`activity/${id}`, 
            { 
                credentials: 'include',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status == 200)
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
    async remove(id: string): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.delete(`activity/${id}`, { credentials: 'include' });

            if (response.status == 200)
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
}

export default new task();