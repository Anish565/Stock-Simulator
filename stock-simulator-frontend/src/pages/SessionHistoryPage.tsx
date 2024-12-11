import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SessionHistory from "../components/SessionHistory";
import { decodeUserToken } from "../utils/jwtDecode";
import { fetchSessions } from "../utils/apiService";

interface Session {
  name: string;
  startAmount: number;
  targetAmount: number;
  finishingFunds: number;
  endDate: string;
}


const SessionHistoryPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  // Sample session data (Replace with actual data from state or API)
  // const sessions: Session[] = [
  //   {
  //     name: "Session 1",
  //     startingFunds: 1000,
  //     targetFunds: 2000,
  //     finishingFunds: 1800,
  //     score: 90, // Arbitrary score calculation
  //   },
  //   {
  //     name: "Session 2",
  //     startingFunds: 500,
  //     targetFunds: 1500,
  //     finishingFunds: 1800,
  //     score: 80,
  //   },
  //   {
  //     name: "Session 3",
  //     startingFunds: 1500,
  //     targetFunds: 3000,
  //     finishingFunds: 2500,
  //     score: 85,
  //   },
  //   {
  //     name: "Session 4",
  //     startingFunds: 800,
  //     targetFunds: 2000,
  //     finishingFunds: 100,
  //     score: 92,
  //   }
  // ];

  const user = decodeUserToken();
  const getHistory = async () => {
    const sessions = await fetchSessions(user?.username || "", false);
    setSessions(sessions);
    // console.log("History", sessions);
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Session History</h2>
        
        <div className="space-y-4">
          {sessions && sessions.length > 0 ? sessions.map((session: Session, index: number) => (
            <SessionHistory key={index} session={session} index={index} />
          )) : <div>No sessions found</div>}
        </div>
      </div>
    </Layout>
  );
};

export default SessionHistoryPage;
