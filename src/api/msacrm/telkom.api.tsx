
export class telkom_api
{
    private url = 'https://msacrm-dev.telkom.co.id';

    api_key(): string
    {
        return btoa(import.meta.env.VITE_USERNAME + ':' + import.meta.env.VITE_PASSWORD);
    }

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

export default new telkom_api();