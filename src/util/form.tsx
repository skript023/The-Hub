export default class form 
{
    static from_json(formData: FormData, prefix: string, obj: any)
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
                this.from_json(formData, fieldName, value);
            } 
            else 
            {
                formData.append(fieldName, value);
            }
        }
    };
}