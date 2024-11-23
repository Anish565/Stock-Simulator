import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
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

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${apiEndpoint}/login`,
            { username, password },
        );
        console.log("User logged in successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const fetchQRCode = async (session: string, appName: string, username: string) => {
    try {
      const response = await axios.post(`${apiEndpoint}/auth/qrcode`, {
        session,
        app_name: appName,
        username,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching QR code:", error);
      throw error;
    }
  };

  export const verifyMFA = async (session: string, userCode: string, username: string) => {
    try {
      const response = await axios.post(`${apiEndpoint}/auth/code`, {
        session,
        userCode,
        username,
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying MFA:", error);
      throw error;
    }
  };

  export const completeLoginWithMFA = async (session: string, clientId: string, username: string, mfaCode: string) => {
    try {
      const response = await axios.post(`${apiEndpoint}/auth/tokens`, {
            session,
            clientId,
            username,
            mfaCode,
      });
      return response.data;
    } catch (error) {
      console.error("Error completing MFA login:", error);
      throw error;
    }
  };