import User from "./user.dto";

export default interface Task
{
    _id: string | undefined;
    name: string;
    user_id: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    status: string;
    user: User | undefined;
}