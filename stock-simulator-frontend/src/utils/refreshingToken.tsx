export const setupTokenRefresh = () => {
    const refreshTokens = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.error("Refresh token not found in localStorage.");
                return;
            }
            // https://<user-pool-domain>.auth.us-east-1.amazoncognito.com/oauth2/token

            const response = await fetch('https://stocksimulator.auth.us-east-1.amazoncognito.com/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: '64e8qanipc9od0cb9h0rs5piao',
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('idToken', data.id_token);

            // Refresh token may not change, but update it if provided
            if (data.refresh_token) {
                localStorage.setItem('refreshToken', data.refresh_token);
            }

            console.log("Tokens refreshed successfully.");
            return data;
        } catch (error) {
            console.error("Token refresh failed:", error);
            throw error;
        }
    };

    // Initial refresh
    refreshTokens();

    // Refresh tokens every 55 minutes
    const intervalId = setInterval(refreshTokens, 60 * 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
};
