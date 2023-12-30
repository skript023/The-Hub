
export class api
{
    //private url = import.meta.env.VITE_ENVIRONMENT === 'prod' ? 'https://crm-backend.glitch.me' : 'http://localhost:3000';
    private url = 'https://crm-backend.glitch.me';

    async post(route: string, init : RequestInit | undefined)
    {
        return fetch(`${this.url}/${route}`, {
            method: 'POST',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }
    async patch(route: string, init : RequestInit | undefined)
    {
        return fetch(`${this.url}/${route}`, {
            method: 'PATCH',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }
    async put(route: string, init : RequestInit | undefined)
    {
        return fetch(`${this.url}/${route}`, {
            method: 'PUT',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }
    async delete(route: string, init : RequestInit | undefined)
    {
        return fetch(`${this.url}/${route}`, {
            method: 'DELETE',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
    }
    async get(route: string, init : RequestInit | undefined)
    {
        return fetch(`${this.url}/${route}`, {
            method: 'GET',
            credentials: init?.credentials,
            headers: init?.headers,
            mode: init?.mode,
            body: init?.body,
            cache: init?.cache,
            integrity: init?.integrity,
            keepalive: init?.keepalive,
            redirect: init?.redirect,
            referrer: init?.referrer,
            referrerPolicy: init?.referrerPolicy,
            signal: init?.signal,
            window: init?.window
        });
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
