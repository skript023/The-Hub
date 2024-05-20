import User from "./user.dto";

export interface Evidents {
    image: string;
}

export interface AttributesDetail {
    name: string;
    value: string;
}

export interface ProductDetail 
{
    order_num: string;
    type: string;
    status: string;
    attributes: AttributesDetail[];
    captures: Evidents[];
    images: FileList | null;
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