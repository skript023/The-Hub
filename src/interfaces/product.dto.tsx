import User from "./user.dto";

interface ProductDetail 
{
    order_num: string;
    type: string;
    status: string;
};


export default interface Product
{
    _id: string | undefined;
    user_id: string | undefined;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
    detail: ProductDetail[];
    user: User | undefined;
};