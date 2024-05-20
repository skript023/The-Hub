import api from "./api"
import Product from "../interfaces/product.dto";
import ServerResponse from "../interfaces/response.dto";
import { toast } from "../components/snackbar";
import formatter from "../util/formatter";
import form from "../util/form";
import MsaOrderData from "../interfaces/msa_order.dto";

class product
{
    async create(product: Product): Promise<ServerResponse<Product> | undefined>
    {
        const forms = new FormData();

        form.from_json(forms, '', product);
        
        forms.delete('_id');
        forms.delete('user');
        
        try 
        {
            const response = await api.post('product', { 
                credentials: 'include',
                body: forms,
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }
            
            return response.json();
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

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            const json = await response.json() as ServerResponse<Product[]>;

            json.data.map((data) => {
                data.start_date = formatter.convertDateFormat(data.start_date as any);
                data.end_date = formatter.convertDateFormat(data.end_date as any);
            });

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error('API Call Get Products', error.message);

            return undefined;
        }
    }
    async findOne(id: number): Promise<Product | undefined>
    {
        try 
        {
            const response = await api.get(`product/${id}`, {credentials: 'include'});

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            const json = await response.json() as ServerResponse<Product>;

            json.data.start_date = formatter.convertDateFormat(json.data.start_date as any);
            json.data.end_date = formatter.convertDateFormat(json.data.end_date as any);

            return json.data;
        } 
        catch (error: any) 
        {
            toast.error('API Call Get Product', error.message);

            return undefined;
        }
    }
    async update(id: string, product: Product): Promise<ServerResponse<Product> | undefined>
    {
        try 
        {
            const forms = new FormData();

            form.from_json(forms, '', product);

            forms.delete('_id');
            forms.delete('user');
            
            const response = await api.patch(`product/${id}`, 
            { 
                credentials: 'include',
                body: forms
            });

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

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

            if (response.status == 401)
            {
                location.reload();

                return undefined
            }

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('API Call Product Delete', error.message);

            return undefined;
        }
    }
    async uploadEvident(id: string, product: FormData): Promise<ServerResponse<Product> | undefined>
    {
        try 
        {
            const response = await api.put(`product/uploads/detail/captures/${id}`, 
            { 
                credentials: 'include',
                body: product,
            });

            return response.json();
        } 
        catch (error: any) 
        {
            toast.error('API Call Product Update', error.message);

            return undefined;
        }
    }

    async generateDocument(id: string)
    {
        try 
        {
            const response = await api.get(`product/doc/${id}`, 
            {
                credentials: 'include',
            });

            if (response.status == 200)
            {
                return response.blob();
            }
            
            return undefined;
        } 
        catch (error: any)
        {
            toast.error('Document Generate', error.message);

            return undefined;
        }
    }

    async getOrderDataById(id: string): Promise<ServerResponse<MsaOrderData[]> | undefined>
    {
        try 
        {
            const response = await api.get(`product/siebel/getMasterDataOrder?orderNum=${id}`, 
            {
                credentials: 'include',
            });

            return response.json();
        } 
        catch (error: any)
        {
            toast.error('Document Generate', error.message);

            return undefined;
        }
    }
} 

export default new product()