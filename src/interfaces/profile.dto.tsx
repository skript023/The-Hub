import Role from "./role.dto";
import Route from "./route";

export default interface Profile
{
    _id: string;
    role_id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    hardware_id: string;
    computer_name: string;
    image: string;
    expired: string;
    recent_login: string;
    remember_token: string;
    role: Role
    route: Route[]
}