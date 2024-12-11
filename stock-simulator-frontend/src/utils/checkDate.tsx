import { decodeUserToken } from "./jwtDecode";
import { completeSession, fetchSessions } from "./apiService";


export const checkDate = async (stockData: unknown) => {
    console.log("checkDate");
    console.log("stockData from checkDate", stockData);
    
    // Get user info
    const userInfo = decodeUserToken();
    const userId = userInfo?.username;
    if (!userId) {
        throw new Error("No user ID found");
    }

    try {
        console.log("Fetching sessions for user:", userId);
        // Fetch sessions and handle potential errors
        const response = await fetchSessions(userId, true);
        console.log("sessions", response);

        // loop through sessions and check if the endDate is in the past
        for (const session of response) {
            // Convert dates to start of day for fair comparison
            const endDate = new Date(session.endDate);
            console.log("endDate", endDate);
            const today = new Date();
            
            // Reset both dates to start of day in local timezone
            endDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            if (endDate < today) {
                await completeSession(session.id, stockData);
                console.log("Session completed:", session.id);
            }
        }
    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw error;
    }
};

// Function to schedule the check at midnight
export const scheduleEndOfDayCheck = async () => {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // next day
        0, // hour: 0 = midnight
        0, // minute
        0  // second
    );
    
    const msUntilMidnight = night.getTime() - now.getTime();
    await checkDate();
    // Schedule first run
    setTimeout(async () => {
        await checkDate();
        // After first run, schedule it to run every 24 hours
        setInterval(checkDate, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
};