import axios from "axios";

const apiEndpoint = 'https://rs2qai0n3i.execute-api.us-east-1.amazonaws.com/DevStage';
console.log("API Endpoint:", apiEndpoint);

export const registerUser = async (username: string, email: string, password: string, DOB: string, firstName: string, lastName: string) => {
    try {
        console.log("Registering user:", { username, email, password, DOB, firstName, lastName });
        const response = await axios.post(
            `${apiEndpoint}/register`,
            { username, email, password, DOB, firstName, lastName },
        );
        console.log("User registered successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

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