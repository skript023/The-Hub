import toast from "react-hot-toast";
import telkom_api from "./telkom.api";

class telkom_account
{
    async getAccountHierarchy(i_account_num: string)
    {
        try 
        {
            const response = await telkom_api.get(`wibs/account/v1/getAccountHierarchy?i_account_num=${i_account_num}`, {
                headers: {
                    "Authorization": `Basic ${telkom_api.api_key()}`,
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

    async getAccounDetail(i_account_num: string)
    {
        try 
        {
            const response = await telkom_api.get(`wibs/account/v1/getAccounDetail?i_account_num=${i_account_num}`, {
                headers: {
                    "Authorization": `Basic ${telkom_api.api_key()}`,
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

export default new telkom_account();