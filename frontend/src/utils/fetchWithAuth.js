// src/utils/fetchWithAuth.js
export async function fetchWithAuth(url, options = {}, onLogout) {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.status === 401) {
        const refreshRes = await fetch('http://localhost:3000/api/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        const refreshData = await refreshRes.json();

        // if (!refreshData.success) {
        //     localStorage.removeItem('accessToken');
        //     localStorage.removeItem('user');
        //     window.location.href = '/account';
        //     return null;
        // }

        if (!refreshData.success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            if (onLogout) onLogout();
            else window.location.href = '/account';
            return null;
        }

        localStorage.setItem('accessToken', refreshData.data.accessToken);

        return fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                'Authorization': `Bearer ${refreshData.data.accessToken}`
            }
        });
    }

    return response;
}