import api from "./api"
import Product from "../interfaces/product.dto";
import ServerResponse from "../interfaces/response.dto";
import { toast } from "../components/snackbar";
import formatter from "../util/formatter";

class product
{
    async create(product: Product): Promise<ServerResponse<Product> | undefined>
    {
        const form = new FormData();

        if (!product.capture) return undefined;

        this.form_data(form, '', product);

        for (let i = 0; i < product.capture.length; i++)
        {
            form.append('capture', product.capture[i]);
            form.delete(`capture[${i}]`);
        }
        
        form.delete('_id');
        form.delete('user');
        
        form.forEach((value, key) => {
            console.log(`${key}:${value}`);
            
        })

        try 
        {
            const response = await api.post('product', { 
                credentials: 'include',
                body: form,
            });
            
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

            if (response.status == 200)
            {
                const json = await response.json() as ServerResponse<Product[]>;

                json.data.map((data) => {
                    data.start_date = formatter.convertDateFormat(data.start_date as any);
                    data.end_date = formatter.convertDateFormat(data.end_date as any);
                });

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

                json.data.start_date = formatter.convertDateFormat(json.data.start_date as any);
                json.data.end_date = formatter.convertDateFormat(json.data.end_date as any);

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

    private form_data(formData: FormData, prefix: string, obj: any)
    {
        for (const [key, value] of Object.entries(obj) as any) 
        {
            const fieldName = prefix ? `${prefix}[${key}]` : key;
            if (value instanceof File) 
            {
                formData.append(fieldName, value);
            } 
            else if (typeof value === 'object' && value !== null) 
            {
                this.form_data(formData, fieldName, value);
            } 
            else 
            {
                formData.append(fieldName, value);
            }
        }
    };
} 

export default new product()