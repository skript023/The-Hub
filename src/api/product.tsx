import toast from "react-hot-toast";
import api from "./api"
import Product from "../interfaces/product.dto";
import ServerResponse from "../interfaces/response.dto";

class product
{
    async findAll(): Promise<Product[] | undefined>
    {
        try 
        {
            const response = await api.get('products', {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Product[]>;

                return json.data;
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
            const response = await api.get(`products/${id}`, {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Product>;

                return json.data;
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