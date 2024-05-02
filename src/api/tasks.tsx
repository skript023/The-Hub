import Task from "../interfaces/task.dto";
import api from "./api";
import ServerResponse from "../interfaces/response.dto";
import formatter from "../util/formatter";
import { toast } from "../components/snackbar";

class task
{
    async complete(id: string): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.patch(`activity/complete/${id}`, { 
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Complete Task', error.message);

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
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Create Task', error.message);

            return undefined;
        }
    }
    async findAll(): Promise<Task[] | undefined>
    {
        try 
        {
            const response = await api.get('activity', { 
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            const json = await response.json() as ServerResponse<Task[]>;
            
            json.data.map((data) => {
                data.start_date = formatter.convertDateFormat(data.start_date as any);
                data.end_date = formatter.convertDateFormat(data.end_date as any);
            });

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error('Get Task', error.message);

            return undefined;
        }
    }

    async findOne(id: string): Promise<Task | undefined>
    {
        try 
        {
            const response = await api.get(`activity/${id}`, { 
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            const json = await response.json() as ServerResponse<Task>;

            json.data.start_date = formatter.convertDateFormat(json.data.start_date as any);
            json.data.end_date = formatter.convertDateFormat(json.data.end_date as any);

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error('Get Task', error.message);

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
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Update Task', error.message);

            return undefined;
        }
    }
    async remove(id: string): Promise<ServerResponse<Task> | undefined>
    {
        try 
        {
            const response = await api.delete(`activity/${id}`, { 
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Origin": '*',
                }
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Delete Task', error.message);

            return undefined;
        }
    }
}

export default new task();