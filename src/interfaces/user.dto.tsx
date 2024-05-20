

export default interface User {
    _id: string;
    role_id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    hardware_id: string;
    computer_name: string;
    image: any;
    expired: string;
    recent_login: string;
    remember_token: string;
}