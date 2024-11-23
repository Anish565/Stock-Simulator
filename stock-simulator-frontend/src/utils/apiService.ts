import axios from "axios";

const apiEndpoint = process.env.APIENDPOINT;

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${apiEndpoint}/register`, {
            body: { username, email, password },
        });
        console.log("User registered successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiEndpoint}/login`, {
            body: { email, password },
        });
        console.log("User logged in successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}