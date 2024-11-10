import React from "react";
import Layout from "../components/Layout";
import SessionHistory from "../components/SessionHistory";

interface Session {
  name: string;
  startingFunds: number;
  targetFunds: number;
  finishingFunds: number;
  score: number; // Calculated score or any relevant metric
}


const SessionHistoryPage: React.FC = () => {
  // Sample session data (Replace with actual data from state or API)
  const sessions: Session[] = [
    {
      name: "Session 1",
      startingFunds: 1000,
      targetFunds: 2000,
      finishingFunds: 1800,
      score: 90, // Arbitrary score calculation
    },
    {
      name: "Session 2",
      startingFunds: 500,
      targetFunds: 1500,
      finishingFunds: 1800,
      score: 80,
    },
    {
      name: "Session 3",
      startingFunds: 1500,
      targetFunds: 3000,
      finishingFunds: 2500,
      score: 85,
    },
    {
      name: "Session 4",
      startingFunds: 800,
      targetFunds: 2000,
      finishingFunds: 100,
      score: 92,
    }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Session History</h2>
        
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <SessionHistory session={session} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SessionHistoryPage;
