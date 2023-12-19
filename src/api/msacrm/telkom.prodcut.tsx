import toast from "react-hot-toast";
import telkom_api from "./telkom.api";

class telkom_product
{
    async createAttribute(objectAttribute: any)
    {
        try 
        {
            const response = await telkom_api.post('wibs/product/v1/createAttribute', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Basic ${telkom_api.api_key()}`
                },
                body: JSON.stringify(objectAttribute)
            });
    
            if (response.status == 201)
            {
                const json = await response.json();
    
                toast.success(json.status_message);
    
                return json;
            }
    
            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }

    async valueAttribute(attributeBody: any)
    {
        try 
        {
            const response = await telkom_api.post('wibs/product/v1/valueAttribute', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Basic ${telkom_api.api_key()}`
                },
                body: JSON.stringify(attributeBody)
            })
    
            if (response.status == 200)
            {
                const json = await response.json();

                toast.success(json.status_message);

                return json;
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }

    async getProductUnderCatalog(catalogName: string, pageSize: number, pageNum: number)
    {
        try 
        {
            const response = await telkom_api.get(`wibs/product/v1/getProductUnderCatalog?catalog_name=${catalogName}&page_size${pageSize}&page_num${pageNum}`, {
                headers: {
                    'Authorization': `Basic ${telkom_api.api_key()}`,
                    'Accept': 'application/json'
                }
            });

            if (response.status == 200)
            {
                const json = await response.json();

                toast.success(json.status_message);

                return json;
            }

            return undefined;
        } 
        catch (error: any) 
        {
            toast.error(error.message);

            return undefined;
        }
    }
}

export default new telkom_product()