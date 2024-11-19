import axios from "axios";

const apiEndpoint = process.env.APIENDPOINT;

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${apiEndpoint}/users/register`, {
            body: { username, email, password },
        });
        console.log("User registered successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}