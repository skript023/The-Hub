import { base } from "../util/base";

export class api
{
    private url = import.meta.env.VITE_ENVIRONMENT === 'dev' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD;

    server(): string { return this.url; }

    async post(route: string, init? : RequestInit | undefined)
    {
        const response = await fetch(`${this.url}/${route}`, {
            method: 'POST',
            credentials: 'include',
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: 'default',
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });

            if (response.status == 401)
            {
                location.replace(base);
                localStorage.clear();
            }

        return response;
    }
    async patch(route: string, init? : RequestInit | undefined)
    {
        const response = await fetch(`${this.url}/${route}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: 'default',
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });

        if (response.status == 401)
        {
            location.replace(base);
            localStorage.clear();
        }

        return response;
    }
    async put(route: string, init? : RequestInit | undefined)
    {
        const response = await fetch(`${this.url}/${route}`, {
            method: 'PUT',
            credentials: 'include',
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: 'default',
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });

        if (response.status == 401)
        {
            location.replace(base);
            localStorage.clear();
        }

        return response;
    }
    async delete(route: string, init? : RequestInit | undefined)
    {
        const response = await fetch(`${this.url}/${route}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: 'default',
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });

        if (response.status == 401)
        {
            location.replace(base);
            localStorage.clear();
        }

        return response;
    }
    async get(route: string, init? : RequestInit | undefined)
    {
        const response = await fetch(`${this.url}/${route}`, {
            method: 'GET',
            credentials: 'include',
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: 'default',
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });

        if (response.status == 401)
        {
            location.replace(base);
            localStorage.clear();
        }

        return response;
    }
}

export default new api();


// {
//     "lookup":
//     {"0":true,"3":true},
//     "data":[
//         {"index":0,"dataIndex":0},
//         {"index":3,"dataIndex":3}
//     ]
// }
