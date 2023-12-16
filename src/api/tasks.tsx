import toast from "react-hot-toast";
import Task from "../interfaces/task.dto";
import api from "./api";
import ServerResponse from "../interfaces/response.dto";

class task
{
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
                const json = await response.json() as ServerResponse<Task>;

                return json;
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

    async findOne(id: number): Promise<Task | undefined>
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
}

export default new task();