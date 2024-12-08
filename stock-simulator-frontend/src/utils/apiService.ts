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

export const fetchStockData = async (symbol: string, interval: string) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/fetch/stocks?symbol=${symbol}&interval=${interval}`
    );
    // Transform the data to ensure dates are Date objects
    const parsedData = response.data.map((item: any) => ({
      ...item,
      date: new Date(item.date),
    }));
    return parsedData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const fetchStockMetaData = async (symbol: string) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/fetch/stocks?symbol=${symbol}&interval=meta`
    );

    return response;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const fetchNewsDataFromAPI = async () => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/news/get`
    );
    return response;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const createSession = async (name: string, startAmount: number, targetAmount: number, duration: string, userId: string) => {
  try {
    console.log("Creating session:", { name, startAmount, targetAmount, duration, userId });
    const response = await axios.post(
      `${apiEndpoint}/session/create`,
      { name, startAmount, targetAmount, duration, userId }
    );
    console.log("Session created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const fetchSessions = async (userId: string, inProgress: boolean) => {
  try {
    console.log("Fetching sessions API Call:", { userId, inProgress });
    const response = await axios.get(`${apiEndpoint}/session?userId=${userId}&inProgress=${inProgress}`);

    console.log("Fetch sessionAPI Response:", response.data.sessions);
    
    // The response.data already contains the parsed object with sessions array
    const { sessions } = response.data;

    console.log("Fetched sessions from API:", sessions);
    
    // Transform the DynamoDB format to a simpler object structure
    return sessions.map((session: any) => ({
      id: session.sessionId,
      name: session.name,
      startAmount: Number(session.startAmount),
      targetAmount: Number(session.targetAmount),
      duration: session.duration,
      inProgress: session.inProgress
    }));
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    const response = await axios.delete(
      `${apiEndpoint}/session/delete?sessionId=${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

export const fetchSessionOrders = async (sessionId: string) => {
  try {
    console.log("Fetching session orders API Call:", { sessionId });
    const response = await axios.get(
      `${apiEndpoint}/session/get/info?sessionId=${sessionId}&sortKey=orders`
    );
    console.log("Get orders API Response:", response.data);
    return response.data.data.orders;
  } catch (error) {
    console.error("Error fetching session orders:", error);
    throw error;
  }
};

export const fetchSessionPortfolio = async (sessionId: string) => {
  try {
    console.log("Fetching session portfolio API Call:",  sessionId );
    const response = await axios.get(
      `${apiEndpoint}/session/get/info?sessionId=${sessionId}&sortKey=portfolio`
    );
    console.log("Get portfolio API Response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching session portfolio:", error);
    throw error;
  }
};