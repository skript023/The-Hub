import toast from "react-hot-toast";
import Task from "../interfaces/task.dto";
import api from "./api";

class task
{
    async create(task: Task): Promise<any>
    {
        try 
        {
            const response = await api.post('activity/add', { 
                credentials: 'include',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return false;
        }
    }
    async findAll(): Promise<Task[] | undefined>
    {
        try 
        {
            const response = await api.get('activity', { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as Task[];

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

    async findOne(id: number): Promise<Task | undefined>
    {
        try 
        {
            const response = await api.get(`activity/detail/${id}`, { credentials: 'include' });

            if (response.status == 200)
            {
                const json = await response.json() as Task;

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

export default new task();