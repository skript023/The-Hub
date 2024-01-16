import api from "./api"
import Product from "../interfaces/product.dto";
import ServerResponse from "../interfaces/response.dto";
import { toast } from "../components/snackbar";

class product
{
    async create(product: Product): Promise<ServerResponse<Product> | undefined>
    {
        try 
        {
            const response = await api.post('product', { 
                credentials: 'include',
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (response.status == 201)
            {
                return response.json();
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error('API Call Product Creation', error.message);

            return undefined;
        }
    }
    async findAll(): Promise<Product[] | undefined>
    {
        try 
        {
            const response = await api.get('product', {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Product[]>;

                return json.data;
            }
        } 
        catch (error: any) 
        {
            toast.error('API Call Get Products', error.message);

            return undefined;
        }

        return undefined;
    }
    async findOne(id: number): Promise<Product | undefined>
    {
        try 
        {
            const response = await api.get(`product/${id}`, {credentials: 'include'});

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Product>;

                return json.data;
            }
        } 
        catch (error: any) 
        {
            toast.error('API Call Get Product', error.message);

            return undefined;
        }

        return undefined;
    }
    async update(id: string, product: Product): Promise<ServerResponse<Product> | undefined>
    {
        try 
        {
            const response = await api.patch(`product/${id}`, 
            { 
                credentials: 'include',
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('API Call Product Update', error.message);

            return undefined;
        }
    }
    async remove(id: string): Promise<ServerResponse<Product> | undefined>
    {
        try 
        {
            const response = await api.delete(`product/${id}`, { credentials: 'include' });

            if (response.status == 200)
            {
                return response.json();
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error('API Call Product Delete', error.message);

            return undefined;
        }
    }
} 

export default new product()