import { toast } from "../components/snackbar";
import { Attendance } from "../interfaces/attendance";
import ServerResponse from "../interfaces/response.dto";
import api from "./api";

class attendance
{
    async create(attendance: Attendance)
    {
        try 
        {
            const response = await api.post('attendance', {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(attendance)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async findAll(): Promise<ServerResponse<Attendance[]> | undefined>
    {
        try 
        {
            const response = await api.get('attendance');

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async update(id: string, attendance: Attendance): Promise<ServerResponse<Attendance[]> | undefined>
    {
        try 
        {
            const response = await api.patch(`attendance/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(attendance)
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }

    async remove(id: string): Promise<ServerResponse<Attendance[]> | undefined>
    {
        try 
        {
            const response = await api.delete(`attendance/${id}`);

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('Exception', error.message);

            return undefined;
        }
    }
}

export default new attendance();