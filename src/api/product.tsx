import toast from "react-hot-toast";
import api from "./api"
import Product from "../interfaces/product.dto";

class product
{
    async getProducts(): Promise<Product[] | undefined>
    {
        try 
        {
            const response = await api.get('products', {credentials: 'include'});

            if (response.status == 200)
            {
                const json = response.json();

                return json;
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message)
        }

        return undefined;
    }

    async getOneProduct(id: number): Promise<Product | undefined>
    {
        try 
        {
            const response = await api.get(`products/detail/${id}`, {credentials: 'include'});

            if (response.status == 200)
            {
                const json = response.json();

                return json;
            }
        } 
        catch (error: any) 
        {
            toast.error(error.message)
        }

        return undefined;
    }
} 

export default new product()