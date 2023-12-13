import toast from "react-hot-toast";
import api from "./api"
import Product from "../interfaces/product.dto";

class product
{
    async findAll(): Promise<Product[] | undefined>
    {
        try 
        {
            const response = await api.get('products', {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as Product[];

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

    async findOne(id: number): Promise<Product | undefined>
    {
        try 
        {
            const response = await api.get(`products/detail/${id}`, {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as Product;

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

export default new product()