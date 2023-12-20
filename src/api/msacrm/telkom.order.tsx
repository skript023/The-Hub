import toast from "react-hot-toast";
import telkomApi from "./telkom.api";

class telkom_order
{
    async getMasterOrderData(orderNum: string, pageSize: number, pageNum: number)
    {
        try 
        {
            const response = await telkomApi.get(`https://msacrm-dev.telkom.co.id/wibs/order/v1/getMasterDataOrder?orderNum=${orderNum}&pageSize=${pageSize}&pageNum=${pageNum}`, {
                headers: {
                    'Authorization': `Basic ${telkomApi.api_key()}`,
                    'Accept': 'application/json'
                }
            });

            if (response.status == 200)
            {
                const json = await response.json();

                toast.success(json.statusMessage);

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

export default new telkom_order();