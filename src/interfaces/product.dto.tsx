
interface ProductDetail 
{
    order_num: string;
    type: string;
    status: string;
};


export default interface Product
{
    _id: string;
    user_id: string | undefined;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
    detail: ProductDetail[] | undefined;
};