import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
        return localStorage.getItem("access_token");
};

export const saveTokens = (access, refresh, user) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    if (user?.role) {
        localStorage.setItem("user_role", user.role);
    }
};

// Load tokens
export const getTokens = () => ({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token")
});

// Remove tokens
export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    
};

// Decode access token
export const getUserFromToken = () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return { ...decoded, role };
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
};

// Authenticated request with auto-refresh
export const authRequest = async (config) => {
    let { access, refresh } = getTokens();
    if (!access) throw new Error("No access token");

    const tokenExp = jwtDecode(access).exp * 1000;
    const now = Date.now();

  // If token expired, refresh
    if (now >= tokenExp) {
        if (!refresh) throw new Error("No refresh token");
        try {
            const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, { refresh });
            access = refreshRes.data.access;
            saveTokens(access, refresh);
        } catch (err) {
            clearTokens();
            throw err;
        }
    }

    config.headers = { ...config.headers, Authorization: `Bearer ${access}` };
    return axios(config);

};
